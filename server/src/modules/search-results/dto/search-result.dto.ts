import { Exclude, Expose } from 'class-transformer';

import { BaseDTO } from 'src/common/base.dto';

@Exclude()
export class SearchResultDTO extends BaseDTO {
  @Expose()
  readonly adWordsTotal: number;

  @Expose()
  readonly linkTotal: number;

  @Expose()
  readonly searchFound: string;

  @Expose()
  readonly preview: string;
}
