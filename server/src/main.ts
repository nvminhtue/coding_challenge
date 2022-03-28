import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'module-alias/register';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './filters/bad-request-exception.filter';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { InternalServerExceptionFilter } from './filters/internal-server-exception.filter';
import { PageNotFoundExceptionFilter } from './filters/page-not-found-exception.filter';
import { QueryFailedErrorFilter } from './filters/query-failed-exception.filter';
import { LoggerOption } from './logger/logger.option';
import { ProcessLogger } from './logger/process.logger';
import { RequestLogger } from './logger/request.logger';
import { ResponseLogger } from './logger/response.logger';
import { CurrentContext } from './utils/current-context.util';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(LoggerOption),
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL
    }
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
    }),
  );
  app.useGlobalFilters(
    new InternalServerExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new BadRequestExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new PageNotFoundExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new QueryFailedErrorFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
    new EntityNotFoundExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );
  app.useGlobalGuards(new RequestLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.useGlobalInterceptors(new ResponseLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.use(CurrentContext.middleware);

  ProcessLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(process.env.PORT, process.env.APP_DOMAIN);
}
bootstrap();
