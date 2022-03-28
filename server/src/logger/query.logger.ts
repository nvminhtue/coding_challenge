import { Inject, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AdvancedConsoleLogger } from 'typeorm';

import { CurrentContext } from 'src/utils/current-context.util';

import { LoggerConstant } from './logger.constant';

export class QueryLogger extends AdvancedConsoleLogger {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {
    super(LoggerConstant.QueryLogLevels as any);
  }

  logQuery(sql: string, parameters?: any[]) {
    const query = LoggerConstant.QueryPrefix + sql + this.stringifyParams(parameters);

    this.logger.log(query, CurrentContext.getId());
  }

  protected stringifyParams(param: any[]) {
    return param && param.length ? LoggerConstant.ParameterPrefix + JSON.stringify(param) : '';
  }
}
