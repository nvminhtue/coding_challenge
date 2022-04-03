export enum SearchStatusEnum {
  Pending,
  Success,
  Fail,
}

const RedisConfig = {
  'dev': {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
  'production': {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    password: process.env.REDIS_PASSWORD,
    tls: {
      rejectUnauthorized: false,
    },
  },
}

export const TaskConstant = {
  MaximumAttempts: 3,
  FirstAttempts: 1,
  ValidIntervalDuration: 300000,
  MaximumPerFetch: 100,
  ConcurrencyHandlers: 10,
  JobChunk: 10,
  IntervalBatchRun: 10000,
  QueueOptions: {
    prefix: process.env.NODE_ENV,
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: 100,
      removeOnFail: 100,
    },
    redis: RedisConfig[process.env.NODE_ENV],
  },
}
