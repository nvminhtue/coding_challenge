import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

import { UserSearchEntity } from './user-search.entity';

@Injectable()
export class UserSearchQuery {
  constructor(
    @InjectRepository(UserSearchEntity)
    private userSearchRepo: Repository<UserSearchEntity>,
  ) { }

  getUserSearchQuery(
    condition: ObjectLiteral,
  ): SelectQueryBuilder<UserSearchEntity> {
    return this.userSearchRepo
      .createQueryBuilder()
      .leftJoinAndSelect(
        'UserSearchEntity.searchResult',
        'SearchResultEntity'
      )
      .where(condition)
      .orderBy({
        'UserSearchEntity.runAt': 'ASC',
        'UserSearchEntity.searchValue': 'ASC',
        'UserSearchEntity.id': 'ASC',
      })
  }
}
