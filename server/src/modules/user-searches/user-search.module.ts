import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../users/user.module';
import { UserSearchController } from './user-search.controller';
import { UserSearchEntity } from './user-search.entity';
import { UserSearchService } from './user-search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSearchEntity,
    ]),
    UserModule,
  ],
  controllers: [UserSearchController],
  providers: [UserSearchService],
})
export class UserSearchModule { }
