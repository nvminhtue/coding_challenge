import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../users/user.module';
import { UserSearchController } from './user-search.controller';
import { UserSearchEntity } from './user-search.entity';
import { UserSearchQuery } from './user-search.query';
import { UserSearchService } from './user-search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSearchEntity,
    ]),
    UserModule,
  ],
  controllers: [UserSearchController],
  providers: [UserSearchService, UserSearchQuery],
})
export class UserSearchModule { }
