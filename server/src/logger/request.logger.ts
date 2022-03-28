import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { CurrentContext } from 'src/utils/current-context.util';

@Injectable()
export class RequestLogger implements CanActivate {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const logContext = CurrentContext.getId();
    const request = executionContext.switchToHttp().getRequest();

    this.logingRequestInfo(request, logContext);
    this.logingProcesserInfo(executionContext, request, logContext);
    this.logingParameterInfo(request, logContext);

    return true;
  }

  private logingRequestInfo(request, logContext) {
    const { method, path, ip } = request;
    const logInfo = `Started ${method} ${path} for ${ip}`;

    this.logger.log(logInfo, logContext);
  }

  private logingProcesserInfo(executionContext, request, logContext) {
    const className = executionContext.getClass().name;
    const handlerName = executionContext.getHandler().name;
    const format = request.xhr ? 'JS' : 'HTML';
    const logInfo = `Processing by ${className}#${handlerName} as ${format}`;

    this.logger.log(logInfo, logContext);
  }

  private logingParameterInfo(request, logContext) {
    const logInfo = `Parameters: ${JSON.stringify({ ...request.query, ...request.body })}`;

    this.logger.log(logInfo, logContext);
  }
}
