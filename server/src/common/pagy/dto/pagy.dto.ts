import { Exclude, Expose } from 'class-transformer';

import { Default } from '../../../common/decorator/default.decorator';

@Exclude()
export class PagyDTO {
  @Expose()
  @Default(0)
  readonly count: number;

  @Expose()
  @Default(0)
  readonly total: number;

  @Expose()
  @Default(1)
  readonly page: number;

  @Expose()
  @Default(0)
  readonly pageCount: number;
}
