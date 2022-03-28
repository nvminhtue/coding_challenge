import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoggerConstant } from 'src/logger/logger.constant';
import { CurrentContext } from 'src/utils/current-context.util';

@Injectable()
export class ResponseLogger implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  intercept(executionContext: ExecutionContext, next: CallHandler): Observable<any> {
    const logContext = CurrentContext.getId();
    const request = executionContext.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        if (request.xhr) {
          this.logger.log(LoggerConstant.Success, logContext);
        }
      }),
    );
  }
}
