import CliColor from 'cli-color';
import startCase from 'lodash/startCase';
import os from 'os';
import { PlatformTools } from 'typeorm/platform/PlatformTools';
import { format } from 'winston';

import { LoggerConstant } from './logger.constant';

export const ConsoleLogFormat = format.printf(({ context, level, timestamp, message }) => {
  timestamp = new Date(timestamp).toLocaleString();
  const hostname = `[${os.hostname()}]`;

  switch (level) {
    case LoggerConstant.InfoLevel:
      level = CliColor.green(`[${startCase(level)}]`);
      context = CliColor.green(`[${context}]`);
      if (message.startsWith(LoggerConstant.QueryPrefix)) {
        message = PlatformTools.highlightSql(message);
      }
      break;
    case LoggerConstant.ErrorLevel:
      level = CliColor.red(`[${startCase(level)}]`);
      context = CliColor.red(`[${context}]`);
      break;
  }

  return `${level}\t ${hostname}\t ${timestamp}\t ${context}\t ${message}`;
});

export const LogWithoutColor = format.printf(({ context, level, timestamp, message }) => {
  const hostname = `[${os.hostname()}]`;
  timestamp = new Date(timestamp).toLocaleString();
  context = `[${context}]`;
  level = `[${startCase(level)}]`;

  return `${level}\t ${hostname}\t ${timestamp}\t ${context}\t ${message}`;
});
