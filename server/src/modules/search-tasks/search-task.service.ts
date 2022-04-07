import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import Bull from 'bull';
import { exec } from 'child_process';
import chunk from 'lodash/chunk';
import isEmpty from 'lodash/isEmpty';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Connection, EntityManager, Repository } from 'typeorm';

import { LoggerConstant } from 'src/logger/logger.constant';
import { execute } from 'src/utils/child-process.util';

import { SearchStatusEnum, TaskConstant } from '../user-searches/user-search.constant';
import { UserSearchEntity } from '../user-searches/user-search.entity';
import { SearchTaskQuery } from './search-task.query';
import { SearchService } from './search.service';

@Injectable()
export class SearchTaskService {
  queue: Bull.Queue;
  constructor(
    @InjectRepository(UserSearchEntity)
    private userSearchRepo: Repository<UserSearchEntity>,
    private readonly searchService: SearchService,
    private readonly searchTaskQuery: SearchTaskQuery,
    @InjectConnection()
    private readonly connection: Connection,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {
    this.buildQueue();
    this.queue.process(TaskConstant.ConcurrencyHandlers, (job, done) => this.processor(job, done));
    this.queue.on('completed', (job, result) => this.completedHandler(job, result));
    this.queue.on('failed', (job, error) => this.failedHandler(job, error));
  }

  @Interval(TaskConstant.IntervalBatchRun)
  async fetchTask() {
    try {
      let activeTasks = [];
      await this.connection.transaction(async (manager: EntityManager) => {
        activeTasks = await this.searchTaskQuery.pendingSearchTaskQuery(manager);

        if (isEmpty(activeTasks)) {
          return true;
        }

        await this.markingFirstAttempt(activeTasks, manager);
        await this.taskEnqueuing(activeTasks)
      });
    } catch (error) {
      this.loging(error);
    }
  }

  private buildQueue() {
    this.queue = new Bull('TaskQueue', TaskConstant.QueueOptions);
  }

  async processor(job: Bull.Job, done: Bull.DoneCallback) {
    try {
      const [completedTasks, errorTasks] = await this.searchService.executeTask(job.data);
      if (!errorTasks.length) {
        return done(null);
      }
      if (completedTasks.length) {
        await this.searchService.afterExecute(completedTasks);

        await job.update(errorTasks);
      }

      return done(new Error());
    } catch (error) {
      this.loging(error);
    }
  }

  async completedHandler(job: Bull.Job, _result: any) {
    try {
      await this.searchService.afterExecute(job.data);
    } catch (error) {
      this.loging(error);
    } finally {
      job.data.map(async task => {
        await execute(exec, `rm -f $PWD/google-search-module/${task.id}.html`)
      })
    }
  }

  async failedHandler(job: Bull.Job, _error: Error) {
    try {
      if (job.attemptsMade >= job.opts.attempts) {
        await this.searchService.handleError(job.data);
        await this.userSearchRepo.update(
          job.data.map(task => task.id),
          { status: SearchStatusEnum.Fail, attemptsMade: TaskConstant.MaximumAttempts },
        );
      }
    } catch (error) {
      this.loging(error);
    }
  }

  private async markingFirstAttempt (
    activeTasks: UserSearchEntity[],
    manager: EntityManager): Promise<void> {
    manager.update(
      UserSearchEntity,
      activeTasks.map(task => task.id),
      { attemptsMade: TaskConstant.FirstAttempts },
    );
  }

  private async taskEnqueuing(activeTasks: UserSearchEntity[]) {
    const jobs = chunk(activeTasks, TaskConstant.JobChunk);
    for (const job of jobs) {
      await this.queue.add(job, { attempts: TaskConstant.MaximumAttempts });
    }
  }

  private loging(error) {
    if (error.query) {
      const { query, parameters } = error;
      const stringifyParams =
        parameters && parameters.length
          ? LoggerConstant.ParameterPrefix + JSON.stringify(parameters)
          : '';
      const sql = LoggerConstant.QueryPrefix + query + stringifyParams;

      this.logger.log(sql, LoggerConstant.BackgroundJobContext);
    }

    this.logger.error(error.stack || error, null, LoggerConstant.BackgroundJobContext);
  }
}
