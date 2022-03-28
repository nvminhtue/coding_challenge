import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { HTTP_ERR_MSGS } from 'src/constants/errors.constant';
import { LoggerConstant } from 'src/logger/logger.constant';
import { CurrentContext } from 'src/utils/current-context.util';

@Catch(NotFoundException)
export class PageNotFoundExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse();
    const logContext = CurrentContext.getId();
    const status = exception.getStatus();
    const messageResult = HTTP_ERR_MSGS[status];
    this.logger.log(LoggerConstant.NotFound, logContext);

    return response.status(status).json({
      server_datetime: new Date().toISOString(),
      errors: messageResult,
    });
  }
}
