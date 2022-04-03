import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import 'module-alias/register';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import request from 'supertest';
import { getRepository } from 'typeorm';

import { AppModule } from 'src/app.module';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exception.filter';
import { EntityNotFoundExceptionFilter } from 'src/filters/entity-not-found-exception.filter';
import { InternalServerExceptionFilter } from 'src/filters/internal-server-exception.filter';
import { PageNotFoundExceptionFilter } from 'src/filters/page-not-found-exception.filter';
import { QueryFailedErrorFilter } from 'src/filters/query-failed-exception.filter';
import { UnauthroziedExceptionFilter } from 'src/filters/unauthorized-exception.filter';
import { ProcessLogger } from 'src/logger/process.logger';
import { RequestLogger } from 'src/logger/request.logger';
import { ResponseLogger } from 'src/logger/response.logger';
import { SearchResultEntity } from 'src/modules/search-results/search-result.entity';
import { SearchTaskService } from 'src/modules/search-tasks/search-task.service';
import { TaskConstant } from 'src/modules/user-searches/user-search.constant';
import { UserSearchEntity } from 'src/modules/user-searches/user-search.entity';
import { UserEntity } from 'src/modules/users/user.entity';

const trackingResponse = jest.fn().mockReturnValue(true);

const clearDatabase = async () => {
  await getRepository(SearchResultEntity).delete({});
  await getRepository(UserSearchEntity).delete({});
  await getRepository(UserEntity).delete({});
};

export const initApp = async () => {
  jest.setTimeout(60000);
  TaskConstant.QueueOptions.prefix = 'Test';

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app: any = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
    }),
  );
  app.useGlobalGuards(new RequestLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.useGlobalInterceptors(new ResponseLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.useGlobalFilters(
    new InternalServerExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new UnauthroziedExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new BadRequestExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new PageNotFoundExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new QueryFailedErrorFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new EntityNotFoundExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );
  app.use(cookieParser());

  ProcessLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const searchTaskService = await app.get(SearchTaskService);
  await searchTaskService.queue.pause(false);
  jest.spyOn(searchTaskService, 'fetchTask').mockResolvedValue(Promise.resolve());

  return app.init();
};

export const closeApp = async (app: INestApplication) => {
  await clearDatabase();
  app.close();
};

export const getSession = async (app: INestApplication, user: UserEntity): Promise<string> => {
  const jwt = user.refreshToken;

  const response = await request(app.getHttpServer())
    .post('/login')
    .set('Cookie', `refreshToken=${jwt}`)
    .send({
      email: user.email,
      password: user.password,
    });

  return `Bearer ${response.body.accessToken}`
};

export const getResponse = async (
  app: INestApplication,
  method: string,
  path: string,
  session = '',
  param: any = {},
) => {
  trackingResponse.mockClear();

  const response = await request(app.getHttpServer())
  [method](path)
    .set('authorization', session)
    .send(param);

  return [response.status, JSON.parse(response.text)];
};

export const formatFullError = (
  code: number,
  message: string,
  property = null,
  entity = null,
) => ({ entity, property, code, message })

export const formatError = (message: string, property = null) => {
  return [{ message, property }];
};
