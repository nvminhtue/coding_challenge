import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { LoggerConstant } from 'src/logger/logger.constant';
import { CurrentContext } from 'src/utils/current-context.util';

@Catch(UnauthorizedException)
export class UnauthroziedExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errors = exception.getResponse();
    this.logger.log(LoggerConstant.Unauthorized, CurrentContext.getId());

    return response.status(status).json({
      server_datetime: new Date().toISOString(),
      errors,
    });
  }
}
