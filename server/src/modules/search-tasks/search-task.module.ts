import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSearchEntity } from '../user-searches/user-search.entity';
import { SearchTaskQuery } from './search-task.query';
import { SearchTaskService } from './search-task.service';
import { SearchService } from './search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSearchEntity,
    ]),
  ],
  providers: [SearchTaskService, SearchService, SearchTaskQuery],
})

export class SearchTaskModule { }
