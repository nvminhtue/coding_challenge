import { Exclude, Expose, Type } from 'class-transformer';

import { BaseDTO } from 'src/common/base.dto';
import { SearchResultDTO } from 'src/modules/search-results/dto/search-result.dto';

import { SearchStatusEnum } from '../user-search.constant';

@Exclude()
export class UserSearchDTO extends BaseDTO {
  @Expose()
  readonly userId: string;

  @Expose()
  readonly searchValue: string;

  @Expose()
  readonly status: SearchStatusEnum;

  @Expose()
  readonly attemptsMade: number;

  @Expose()
  readonly runAt: Date;

  @Expose()
  @Type(() => SearchResultDTO)
  readonly searchResult: SearchResultDTO;
}
