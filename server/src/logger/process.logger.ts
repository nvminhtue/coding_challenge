import { Logger } from '@nestjs/common';

import { LoggerConstant } from './logger.constant';

export const ProcessLogger = (logger: Logger) => {
  process.on('uncaughtException', exception => {
    logger.error(exception.stack || exception, null, LoggerConstant.UncaughtException);
  });
  process.on('unhandledRejection', (exception: any) => {
    logger.error(exception.stack || exception, null, LoggerConstant.UnhandledRejection);
  });
};
