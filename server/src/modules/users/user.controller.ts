import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { isUUID } from 'class-validator';

import { PathConstant } from 'src/constants/app.constant';
import { ErrorConstant } from 'src/constants/errors.constant';
import { AuthGuard } from 'src/guards/auth.guards';
import { ErrorUtil } from 'src/utils/error.util';

import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller(PathConstant.UserPath)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<UserDTO> {
    if (!isUUID(id)) {
      throw new BadRequestException(
        ErrorUtil.badRequest(
          ErrorConstant.Type.IsNotUUID,
          ErrorConstant.Property.Id,
        ),
      );
    }
    const user = await this.userService.getUser(id);
    return plainToClass(UserDTO, user);
  }
}
