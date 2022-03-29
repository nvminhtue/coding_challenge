import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { EntityConstant } from 'src/constants/entity.constant';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(EntityConstant.ShortLength)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
