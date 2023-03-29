import { dbLogger } from "@/logger";

export const dbLogMiddleware = (sql) => {
  const logString = `sql:${sql}`;
  dbLogger.info(logString);
};
