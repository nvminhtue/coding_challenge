import {
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { CurrentContext } from 'src/utils/current-context.util';
import { ErrorUtil } from 'src/utils/error.util';

@Catch()
export class InternalServerExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }

  catch(exception: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errors = ErrorUtil.internalServerError();
    this.logger.error(exception.stack || exception, null, CurrentContext.getId());

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      server_datetime: new Date().toISOString(),
      errors,
    });
  }
}
