import { Context, Next } from 'koa';
import { accessLogger } from '@/logger';

export const accessLogMiddleware = (ctx: Context, next: Next) => {
  const logString = `path:${ctx.path} | method:${ctx.method} | ua:${ctx.headers['user-agent']}`;
  accessLogger.info(logString);
  return next();
};
