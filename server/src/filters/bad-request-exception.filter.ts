import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { LoggerConstant } from 'src/logger/logger.constant';
import { CurrentContext } from 'src/utils/current-context.util';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errors = exception.getResponse();

    this.logger.log(LoggerConstant.BadRequest, CurrentContext.getId());

    return response.status(status).json({
      server_datetime: new Date().toISOString(),
      errors,
    });
  }
}
