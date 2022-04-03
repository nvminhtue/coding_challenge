import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

import { PagyConstant } from '../pagy.constant';

export class RequestPagyDTO {
  @IsOptional()
  @Transform(value => value && parseInt(value, 10))
  @IsInt()
  @Min(1)
  readonly page: number = PagyConstant.DefaultPage;

  @IsOptional()
  @Transform(value => value && parseInt(value, 10))
  @IsInt()
  @Min(1)
  readonly count: number = PagyConstant.DefaultCount;
}
