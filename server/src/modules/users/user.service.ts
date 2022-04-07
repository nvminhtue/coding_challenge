import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, ObjectLiteral } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserQuery } from './user.query';

@Injectable()
export class UserService {
  constructor(
    private userQuery: UserQuery,
  ) {}

  async getUser(id: string): Promise<UserEntity> {
    return await this.findUser({ id });
  }

  async findUser(condition: ObjectLiteral): Promise<UserEntity> {
    const user = await this.userQuery.getUserQuery(condition);

    if (!user) {
      throw new EntityNotFoundError(UserEntity.name, undefined)
    }

    return user;
  }
}
