import { successLogger } from '@/logger';

export const successLogMiddleware = (name: string, data?: string) => {
  const logString = `${name}:${data ?? ' - '}`;
  successLogger.info(logString);
};
