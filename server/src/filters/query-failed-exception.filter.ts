import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Logger
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { QueryFailedError } from 'typeorm';

import { TableNameMappingConstant } from 'src/constants/errors.constant';
import { LoggerConstant } from 'src/logger/logger.constant';
import { CurrentContext } from 'src/utils/current-context.util';

import { ErrorUtil } from '../utils/error.util';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger
  ) { }
  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const status = HttpStatus.BAD_REQUEST;
    const errors = ErrorUtil.queryFailedError(
      exception,
      parseInt(exception.code, 0),
      TableNameMappingConstant[exception.table],
    );
    this.logger.log(LoggerConstant.BadRequest, CurrentContext.getId())

    return res.status(status).json({
      server_datetime: new Date().toISOString(),
      errors,
    });
  }
}
