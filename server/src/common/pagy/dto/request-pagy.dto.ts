import { IsInt, IsOptional, Min } from 'class-validator';

import { PagyConstant } from '../pagy.constant';

export class RequestPagyDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page: number = PagyConstant.DefaultPage;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly count: number = PagyConstant.DefaultCount;
}
