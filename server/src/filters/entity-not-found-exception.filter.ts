import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Logger
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { LoggerConstant } from 'src/logger/logger.constant';
import { CurrentContext } from 'src/utils/current-context.util';
import { ErrorUtil } from 'src/utils/error.util';


@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const status = HttpStatus.NOT_FOUND;
    const errors = ErrorUtil.entityNotFoundError(exception);
    this.logger.log(LoggerConstant.NotFound, CurrentContext.getId())

    return res.status(status).json({
      server_datetime: new Date().toISOString(),
      errors,
    });
  }
}
