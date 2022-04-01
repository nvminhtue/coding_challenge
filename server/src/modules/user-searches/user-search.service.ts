import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';

import { ErrorConstant } from 'src/constants/errors.constant';
import { ErrorUtil } from 'src/utils/error.util';

import { UserService } from '../users/user.service';
import { UserSearchEntity } from './user-search.entity';

@Injectable()
export class UserSearchService {
  constructor(
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
}
