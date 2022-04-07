import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { SearchStatusEnum, TaskConstant } from '../user-searches/user-search.constant';
import { UserSearchEntity } from '../user-searches/user-search.entity';

@Injectable()
export class SearchTaskQuery {
  async pendingSearchTaskQuery(manager: EntityManager): Promise<UserSearchEntity[]> {
    return manager
      .createQueryBuilder(UserSearchEntity, 'UserSearchEntity')
      .where({ status: SearchStatusEnum.Pending })
      .andWhere('UserSearchEntity.attemptsMade < :mininumAttemp', {
        mininumAttemp: TaskConstant.FirstAttempts,
      })
      .andWhere(
        `UserSearchEntity.runAt
            BETWEEN current_timestamp - interval '${TaskConstant.ValidIntervalDuration} milliseconds'
            AND current_timestamp`,
      )
      .setLock('pessimistic_write')
      .take(TaskConstant.MaximumPerFetch)
      .orderBy('UserSearchEntity.runAt', 'ASC')
      .getMany();
  }
}
