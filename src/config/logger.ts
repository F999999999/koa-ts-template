import { Configuration } from 'log4js';

// log4js 日志配置选项
export const log4jsConfig: Configuration = {
  appenders: {
    default: { type: 'file', filename: 'logs/default.log' },
    db: { type: 'file', filename: 'logs/db.log' },
    access: { type: 'file', filename: 'logs/access.log' },
    error: { type: 'file', filename: 'logs/error.log' },
  },
  categories: {
    default: { appenders: ['default'], level: 'error' },
    db: { appenders: ['db'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    error: { appenders: ['error'], level: 'error' },
  },
};
