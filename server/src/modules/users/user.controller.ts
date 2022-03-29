import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';

import { PathConstant } from 'src/constants/app.constant';
import { ErrorConstant } from 'src/constants/errors.constant';
import { ErrorUtil } from 'src/utils/error.util';

import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller(PathConstant.UserPath)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<UserDTO> {
    if (!isUUID(id)) {
      throw new BadRequestException(
        ErrorUtil.badRequest(
          ErrorConstant.Type.isNotUUID,
          ErrorConstant.Property.Id,
        ),
      );
    }
    const user = await this.userService.getUser(id);
    return plainToInstance(UserDTO, user);
  }
}
