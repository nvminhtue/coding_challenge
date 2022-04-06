import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';

import { RequestPagyDTO } from 'src/common/pagy/dto/request-pagy.dto';
import { PagyService } from 'src/common/pagy/pagy.service';
import { Pagy } from 'src/common/pagy/type/pagy';
import { CSVLengthValidation, CSVParserToString } from 'src/utils/csv-parser.util';

import { UserService } from '../users/user.service';
import { UserSearchEntity } from './user-search.entity';
import { UserSearchQuery } from './user-search.query';

@Injectable()
export class UserSearchService {
  constructor(
    private readonly pagyService: PagyService<UserSearchEntity>,
    private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly userSearchQuery: UserSearchQuery,
  ) { }

  async handleCsv(files, userId: string): Promise<void> {
    const user = await this.userService.getUser(userId);

    const searchValues: string[] = CSVParserToString(files);

    CSVLengthValidation(searchValues);

    await this.connection.transaction(async (manager: EntityManager) => {
      const userSearches = [];
      searchValues.map(searchValue => {
        const userSearch = manager.create(UserSearchEntity, {
          searchValue,
          userId: user.id,
        });

        userSearches.push(userSearch);
      })

      await manager.save(userSearches);
    });
  }

  async getList(userId: string, requestPagyDTO: RequestPagyDTO): Promise<Pagy<UserSearchEntity>> {
    const query = this.userSearchQuery.getUserSearchQuery({ userId })

    return await this.pagyService.queryBuilderPaginate(requestPagyDTO, query)
  }
}
