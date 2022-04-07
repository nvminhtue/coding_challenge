import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserQuery {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) { }

  async getUserQuery(condition: ObjectLiteral): Promise<UserEntity> {
    return this.userRepo.createQueryBuilder()
      .where(condition)
      .getOne()
  }
}
