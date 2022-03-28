import 'dotenv/config';
import { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { AppConstant } from '../constants/app.constant';
import { LoggerConstant } from './logger.constant';
import { ConsoleLogFormat, LogWithoutColor } from './logger.format';

export const LoggerOption = {
  silent: process.env.NODE_ENV === AppConstant.TestEnv,
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        ConsoleLogFormat,
      ),
      silent: process.env.NODE_ENV !== AppConstant.DevEnv,
    }),
    new DailyRotateFile({
      filename: LoggerConstant.FileName,
      dirname: LoggerConstant.StorageDirname,
      format: format.combine(format.timestamp(), LogWithoutColor),
      maxFiles: LoggerConstant.MaxFiles,
      silent: process.env.LOGGER_FORMAT_ENV === AppConstant.DevEnv,
    }),
    new transports.Console({
      format: format.combine(format.timestamp(), LogWithoutColor),
      silent: process.env.LOGGER_FORMAT_ENV !== AppConstant.ProdEnv,
    }),
  ],
};
