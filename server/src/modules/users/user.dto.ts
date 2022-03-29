import { Exclude, Expose } from 'class-transformer';

import { BaseDTO } from 'src/common/base.dto';

@Exclude()
export class UserDTO extends BaseDTO {
  @Expose()
  readonly name: string;

  @Expose()
  readonly username: string;

  @Expose()
  readonly email: string;
}
