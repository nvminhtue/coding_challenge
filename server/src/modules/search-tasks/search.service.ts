import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exec } from 'child_process';
import { Connection, EntityManager, In, Repository } from 'typeorm';

import { execute } from 'src/utils/child-process.util';

import { SearchResultEntity } from '../search-results/search-result.entity';
import { SearchStatusEnum } from '../user-searches/user-search.constant';
import { UserSearchEntity } from '../user-searches/user-search.entity';

interface AnalyzedCrawledData {
  preview: string,
  searchFound: string,
  adWordsTotal: number,
  linkTotal: number
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(UserSearchEntity)
    private userSearchRepo: Repository<UserSearchEntity>,

    private readonly connection: Connection,
  ) { }

  async executeTask(tasks: UserSearchEntity[]) {
    const completedTasks: UserSearchEntity[] = [];
    const errorTasks: UserSearchEntity[] = [];
    for (const task of tasks) {
      try {
        await this.crawlGoogleSearch(task.id, task.searchValue.split(' ').join('+'))

        completedTasks.push(task);
      } catch (error) {
        errorTasks.push(task);
      }
    }
    return [completedTasks, errorTasks];
  }

  async afterExecute(tasks: UserSearchEntity[]) {
    await this.connection.transaction(async (manager: EntityManager) => {
      const searchResultRecords = [];
      const successTasks = [];

      for (const { id: taskId } of tasks) {
        const {
          adWordsTotal,
          linkTotal,
          preview,
          searchFound,
        } = await this.analyzingCrawledData(taskId);

        const searchResultRecord = manager.create(SearchResultEntity, {
          adWordsTotal,
          linkTotal,
          searchFound,
          preview,
          userSearchId: taskId,
        })

        searchResultRecords.push(searchResultRecord);
        successTasks.push(taskId);
      }

      if (searchResultRecords.length) {
        await manager.save(searchResultRecords);
      }
      if (successTasks.length) {
        await manager.update(UserSearchEntity, { id: In(successTasks) }, {
          status: SearchStatusEnum.Success,
        })
      }
    })
  }

  async handleError(userSearches: UserSearchEntity[]) {
    await this.userSearchRepo.update(
      userSearches.map(userSearch => userSearch.id),
      { status: SearchStatusEnum.Fail },
    );
  }

  crawlGoogleSearch(taskId: string, searchQuery: string) {
    const randomIp = `${this.randomInt(255)}.${this.randomInt(255)}.${this.randomInt(255)}.${this.randomInt(255)}`;
    return execute(exec, `$PWD/google-search-module/google-search.sh ${taskId} ${searchQuery} ${randomIp}`);
  }

  randomInt(range) {
    if (typeof range !== 'number') return '0';
    return `${Math.floor(Math.random() * range)}`
  }

  async analyzingCrawledData(taskId): Promise<AnalyzedCrawledData> {
    const crawledData = await execute(exec, `cat $PWD/google-search-module/${taskId}.html`)
    const preview = crawledData.stdout;
    if (!crawledData) {
      throw Error();
    }
    const searchFound = preview.lastIndexOf(`id="result-stats">`) !== -1
      ? preview.substring(
          preview.lastIndexOf(`id="result-stats">`) + `id="result-stats">`.length,
          preview.indexOf('</nobr></div>')
        ).replace(/<nobr>|&nbsp;/g, '')
      : '';
    const adWordsTotal = preview.match(/title="Why\sthis\sad\?"/g)?.length || 0;
    const linkTotal = (preview.match(/<br><h3\s/g)?.length) || 0;

    return {
      preview,
      searchFound,
      adWordsTotal,
      linkTotal
    }
  }
}
