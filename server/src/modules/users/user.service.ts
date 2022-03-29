import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async getUser(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepo
      .createQueryBuilder()
      .where({ id })
      .getOne();

    if (!user) {
      throw new EntityNotFoundError(UserEntity.name, undefined)
    }

    return user;
  }
}
