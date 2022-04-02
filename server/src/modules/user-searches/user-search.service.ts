import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';

import { RequestPagyDTO } from 'src/common/pagy/dto/request-pagy.dto';
import { PagyService } from 'src/common/pagy/pagy.service';
import { Pagy } from 'src/common/pagy/type/pagy';
import { ErrorConstant } from 'src/constants/errors.constant';
import { ErrorUtil } from 'src/utils/error.util';

import { UserService } from '../users/user.service';
import { UserSearchEntity } from './user-search.entity';

@Injectable()
export class UserSearchService {
  constructor(
    @InjectRepository(UserSearchEntity)
    private userSearchRepo: Repository<UserSearchEntity>,
    private readonly pagyService: PagyService<UserSearchEntity>,
    private readonly connection: Connection,
    private readonly userService: UserService,
  ) { }

  async handleCsv(files, userId: string): Promise<void> {
    const user = await this.userService.getUser(userId);

    const searchValues: string[] = files[0].buffer.toString()?.split(',') || [];
    if (!searchValues.length || searchValues.length > 100) {
      throw new BadRequestException(
        ErrorUtil.badRequest(
          ErrorConstant.Type.ExceedAllowedKeywords,
          ErrorConstant.Property.UploadCSVFile,
        ),
      );
    }

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
    const query = this.userSearchRepo
      .createQueryBuilder()
      .leftJoinAndSelect(
        'UserSearchEntity.searchResult',
        'SearchResultEntity'
      )
      .where({ userId })

    return await this.pagyService.queryBuilderPaginate(requestPagyDTO, query)
  }
}
