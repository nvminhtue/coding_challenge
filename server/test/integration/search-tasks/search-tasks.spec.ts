import { INestApplication } from '@nestjs/common';
import Bull from 'bull';
import { expect } from 'chai';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getRepository } from 'typeorm';

import { createUserSearch } from 'src/database/factory/search-task.factory';
import { SearchResultEntity } from 'src/modules/search-results/search-result.entity';
import { SearchTaskService } from 'src/modules/search-tasks/search-task.service';
import { SearchService } from 'src/modules/search-tasks/search.service';
import { TaskConstant } from 'src/modules/user-searches/user-search.constant';
import { UserSearchEntity } from 'src/modules/user-searches/user-search.entity';

import { closeApp, initApp } from 'test/helpers/test.helper';

describe('SearchTaskService', () => {
  let app: INestApplication;
  let queue: Bull.Queue;
  let job: Bull.Job;
  let searchTaskService: SearchTaskService
  let task: UserSearchEntity;
  let expiredTask: UserSearchEntity;
  let logger;

  beforeAll(async () => {
    app = await initApp();
    searchTaskService = app.get(SearchTaskService);
    logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
    logger.error = jest.fn();
    queue = searchTaskService.queue;
  });

  afterAll(async () => {
    await closeApp(app);
  });

  beforeEach(async () => {
    await searchTaskService.queue.pause(false);

    jest.spyOn(SearchService.prototype, 'crawlGoogleSearch')
      .mockReturnValue(Promise.resolve(''));

    jest.spyOn(SearchService.prototype, 'analyzingCrawledData')
      .mockReturnValue(Promise.resolve({
        preview: 'preview',
        searchFound: 'searchFound',
        adWordsTotal: 1,
        linkTotal: 1,
      }));

  });

  afterEach(async () => {
    await queue.empty();
    logger.error.mockClear();
  });

  describe('constructor', () => {
    it('should build a queue', () => {
      expect(queue.name).to.equal('TaskQueue');
      expect((queue as any).defaultJobOptions).to.eql(TaskConstant.QueueOptions.defaultJobOptions);
    });

    it('should register a completed event', async () => {
      expect(await queue.listenerCount('completed')).to.have.equal(1);
    });

    it('should register a failed event', async () => {
      expect(await queue.listenerCount('failed')).to.have.equal(1);
    });
  });

  describe('fetchTask', () => {
    beforeAll(async () => (searchTaskService.fetchTask as any).mockRestore());
    afterAll(async () => jest.spyOn(searchTaskService, 'fetchTask').mockResolvedValue());

    afterEach(async () => await getRepository(SearchResultEntity).delete({}));

    it('There are no any tasks', async () => {
      await searchTaskService.fetchTask();
      const count = await queue.count();

      expect(count).to.equal(0);
    });

    it('There are tasks but it is not time for execution yet (runAt > now)', async () => {
      await createUserSearch({ runAt: new Date(Date.now() + 1000) });

      await searchTaskService.fetchTask();
      const count = await queue.count();

      expect(count).to.equal(0);
    });

    it('There are tasks but it has expired (runAt < now - 300000)', async () => {
      await createUserSearch({ runAt: new Date(Date.now() - 301000) });

      await searchTaskService.fetchTask();
      const count = await queue.count();

      expect(count).to.equal(0);
    });

    it('There are tasks to execute (now - 300000 <= runAt <= now)', async () => {
      const validTask = await createUserSearch();
      await searchTaskService.fetchTask();

      const activeTask = await getRepository(UserSearchEntity).findOne(validTask.id);

      expect(activeTask.status).to.equal(0);
      expect(activeTask.attemptsMade).to.equal(3);
      expect(await queue.count()).to.equal(1);
    });

    it('The fetchTask function is called sequentially', async () => {
      const addJob = queue.add.bind(queue);
      queue.add = async (data, option) => {
        await new Promise((resolve, _reject) => setTimeout(resolve, 2000));
        return addJob(data, option);
      };

      await createUserSearch();
      await Promise.all([
        searchTaskService.fetchTask(),
        searchTaskService.fetchTask(),
      ]);

      expect(await queue.count()).to.equal(2);

      queue.add = addJob;
    });

    it('The logger will be called when there are any errors', async () => {
      const addJob = queue.add.bind(queue);
      queue.add = () => { throw new Error(); };
      await createUserSearch();
      await searchTaskService.fetchTask();

      expect(logger.error.mock.calls.length).to.equal(1);

      queue.add = addJob;
    });
  });

  describe('handleTask', () => {
    beforeAll(async () => {
      task = await createUserSearch({ searchValue: 'value' });
      expiredTask = await createUserSearch({
        searchValue: 'expired value',
        runAt: new Date(Date.now() - 300000)
      });
    });

    beforeEach(async () => {
      job = await queue.add([task], { attempts: TaskConstant.MaximumAttempts });
    });

    describe('processor', () => {
      let error;
      const done = (jobError) => error = jobError;
      const exec = async () => {
        await searchTaskService.processor(job, done);
      };

      it('Error is null if data is valid', async () => {
        await exec();

        expect(error).to.equal(null);
      });
      it('Error is null if task has expired', async () => {
        await job.update([expiredTask]);
        await exec();

        expect(error).to.equal(null);
      });

      it('The logger will be called when there are any errors', async () => {
        await job.update(1);
        await exec();

        expect(logger.error.mock.calls.length).to.equal(1);
      });
    });

    describe('completedHandler', () => {
      const exec = async () => {
        await searchTaskService.completedHandler(job, null);
      };

      afterEach(async () => {
        await getRepository(SearchResultEntity).delete({});
      });

      it('Update status of tasks and call the after execution command', async () => {
        await exec();

        const completedTask = await getRepository(UserSearchEntity).findOne(task.id);
        const results = await getRepository(SearchResultEntity).find();

        expect(completedTask.status).to.equal(1);
        expect(results.length).to.equal(1);
        expect(results[0].preview).to.equal('preview');
        expect(results[0].searchFound).to.equal('searchFound');
        expect(results[0].linkTotal).to.equal(1);
        expect(results[0].adWordsTotal).to.equal(1);

        await getRepository(UserSearchEntity).update(task.id, { status: 0 });
        await getRepository(SearchResultEntity).delete({});
      });

      it('The logger will be called when there are any errors', async () => {
        await job.update([{ id: '1' }]);
        await exec();

        expect(logger.error.mock.calls.length).to.equal(1);
      });
    });

    describe('failedHandler', () => {
      const exec = async () => {
        await searchTaskService.failedHandler(job, null);
      };

      it('Do nothing if attemptsMade < attempts', async () => {
        await exec();

        const activeTask = await getRepository(UserSearchEntity).findOne(task.id);
        const results = await getRepository(SearchResultEntity).find();

        expect(activeTask.status).to.equal(task.status);
        expect(results.length).to.equal(0);
      });

      it('update status of task and call handleError if attemptsMade >= attempts', async () => {
        job.attemptsMade = TaskConstant.MaximumAttempts;
        await exec();

        const failTask = await getRepository(UserSearchEntity).findOne(task.id);
        const results = await getRepository(SearchResultEntity).find();

        expect(failTask.status).to.equal(2);
        expect(results.length).to.equal(0);
      });

      it('The logger will be called when there are any errors', async () => {
        job.attemptsMade = TaskConstant.MaximumAttempts;
        await job.update([{ ...task, id: '1' }]);
        await exec();

        expect(logger.error.mock.calls.length).to.equal(1);
      });
    });
  });
});
