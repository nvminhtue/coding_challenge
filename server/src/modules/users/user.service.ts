import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, ObjectLiteral, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async getUser(id: string): Promise<UserEntity> {
    return await this.findUser({ id });
  }

  async findUser(condition: ObjectLiteral): Promise<UserEntity> {
    const user = await this.userRepo.createQueryBuilder()
      .where(condition)
      .getOne()

    if (!user) {
      throw new EntityNotFoundError(UserEntity.name, undefined)
    }

    return user;
  }
}
