import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSearchEntity } from '../user-searches/user-search.entity';
import { SearchTaskService } from './search-task.service';
import { SearchService } from './search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSearchEntity,
    ]),
  ],
  providers: [SearchTaskService, SearchService],
})

export class SearchTaskModule { }
