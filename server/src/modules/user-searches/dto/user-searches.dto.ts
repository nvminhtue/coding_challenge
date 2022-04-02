import { Exclude, Expose, Type } from 'class-transformer';

import { Default } from 'src/common/decorator/default.decorator';
import { PagyDTO } from 'src/common/pagy/dto/pagy.dto';

import { UserSearchDTO } from './user-search.dto';

@Exclude()
export class UserSearchesDTO {
  @Expose()
  @Type(() => UserSearchDTO)
  @Default([])
  readonly items: UserSearchDTO[];

  @Expose()
  @Type(() => PagyDTO)
  readonly pagyInfo: PagyDTO;
}
