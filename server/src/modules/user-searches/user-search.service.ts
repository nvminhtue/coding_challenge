import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';

import { RequestPagyDTO } from 'src/common/pagy/dto/request-pagy.dto';
import { PagyService } from 'src/common/pagy/pagy.service';
import { Pagy } from 'src/common/pagy/type/pagy';
import { ErrorConstant } from 'src/constants/errors.constant';
import { ErrorUtil } from 'src/utils/error.util';

import { UserService } from '../users/user.service';
import { UserSearchConstant } from './user-search.constant';
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
    // could not regconize pre-changed uploaded file extension
    if (files[0].mimetype !== UserSearchConstant.CSVExtension) {
      throw new BadRequestException(
        ErrorUtil.badRequest(
          ErrorConstant.Type.WrongFileExtension,
          ErrorConstant.Property.UploadCSVFile,
        ),
      );
    }
    const user = await this.userService.getUser(userId);

    const csvBufferString: string = files[0].buffer.toString();
    let searchValues = [];
    const isHavingBreakLine = !!csvBufferString.match(UserSearchConstant.Delimiter.CRLF);

    const searchValuesSplitedByComma: string[] = csvBufferString
      ?.split(UserSearchConstant.Delimiter.Comma) || [];
    if (isHavingBreakLine) {
      searchValuesSplitedByComma.map(searchValue =>
        searchValues.push(...searchValue.split(UserSearchConstant.Delimiter.CRLF))
      )
    } else {
      searchValues = searchValuesSplitedByComma;
    }

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
      .orderBy({
        'UserSearchEntity.runAt': 'ASC',
        'UserSearchEntity.searchValue': 'ASC',
        'UserSearchEntity.id': 'ASC',
      })

    return await this.pagyService.queryBuilderPaginate(requestPagyDTO, query)
  }
}
