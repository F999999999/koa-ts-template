import { errorLogger } from '@/logger';

export const errorLogMiddleware = (name: string, data?: string) => {
  const logString = `${name}:${data ?? ' - '}`;
  errorLogger.info(logString);
};
