import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { IsPasswordConfirmation } from 'src/common/decorator/is-password-confirmation.decorator';
import { EntityConstant } from 'src/constants/entity.constant';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(EntityConstant.ShortLength)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(EntityConstant.ShortLength)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(EntityConstant.ShortLength)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsPasswordConfirmation('password')
  readonly confirmPassword: string;
}
