import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getConnectionOptions } from 'typeorm';

import { AppConstant } from './constants/app.constant';
import { LoggerOption } from './logger/logger.option';
import { QueryLogger } from './logger/query.logger';
import { AuthModule } from './modules/auth/auth.module';
import { SearchTaskModule } from './modules/search-tasks/search-task.module';
import { UserSearchModule } from './modules/user-searches/user-search.module';

const ModuleList = {
  API: [
    WinstonModule.forRoot(LoggerOption),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async (logger) => ({
        ...await getConnectionOptions(), logger: new QueryLogger(logger),
      }),
      inject: [WINSTON_MODULE_NEST_PROVIDER],
    }),
    AuthModule,
    UserSearchModule,
    SearchTaskModule,
  ]
}

function imports() {
  if (process.env.NODE_ENV === AppConstant.DevEnv) {
    return ModuleList.API
  }
  return ModuleList.API
}

@Module({
  imports: imports(),
})
export class AppModule { }
