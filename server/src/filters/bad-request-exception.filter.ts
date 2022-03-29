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

import { ErrorTypesConstant } from 'src/constants/errors.constant';
import { LoggerConstant } from 'src/logger/logger.constant';
import { CurrentContext } from 'src/utils/current-context.util';
import { ErrorUtil } from 'src/utils/error.util';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const extResponse: any = exception.getResponse();
    let messageResult = [];
    const errors = extResponse.message;

    const catchError = error => {
      const errorType = ErrorUtil.getErrorType(error);
      const { message } = ErrorTypesConstant[errorType];
      messageResult.push({ property: error.property, message });
    };
    if (Array.isArray(errors)) {
      for (const error of errors) {
        if (error.children.length) {
          for (const child of error.children) {
            catchError(child);
          }
        } else {
          catchError(error);
        }
      }
    } else {
      messageResult = extResponse;
    }

    this.logger.log(LoggerConstant.BadRequest, CurrentContext.getId());

    return response.status(status).json({
      server_datetime: new Date().toISOString(),
      errors: messageResult,
    });
  }
}
