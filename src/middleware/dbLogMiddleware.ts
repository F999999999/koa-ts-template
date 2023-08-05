import { dbLogger } from '@/logger';

export const dbLogMiddleware = (sql: string, sqlName: string) => {
  const logString = `${sqlName ?? 'sql'}:${sql ?? ' - '}`;
  dbLogger.info(logString);
};
