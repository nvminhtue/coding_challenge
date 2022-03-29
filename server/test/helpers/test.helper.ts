import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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
import { ProcessLogger } from 'src/logger/process.logger';
import { RequestLogger } from 'src/logger/request.logger';
import { ResponseLogger } from 'src/logger/response.logger';
import { UserEntity } from 'src/modules/users/user.entity';

const trackingResponse = jest.fn().mockReturnValue(true);

const clearDatabase = async () => {
  await getRepository(UserEntity).delete({});
};

export const initApp = async () => {
  jest.setTimeout(60000);

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
    new BadRequestExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new PageNotFoundExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new QueryFailedErrorFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new EntityNotFoundExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );

  ProcessLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  return app.init();
};

export const closeApp = async (app: INestApplication) => {
  await clearDatabase();
  app.close();
};

export const getResponse = async (
  app: INestApplication,
  method: string,
  path: string,
  param: any = {},
  xhr = false,
) => {
  trackingResponse.mockClear();

  const response = await request(app.getHttpServer())
  [method](path)
    .set('x-requested-with', xhr ? 'XMLHttpRequest' : null)
    .send(param);

  return [response.status, JSON.parse(response.text)];
};

export const formatError = (
  code: number,
  message: string,
  property = null,
  entity = null,
) => ({ entity, property, code, message })
