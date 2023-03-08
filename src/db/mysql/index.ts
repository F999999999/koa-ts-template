import mysql, { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";

// 导入数据库配置信息
import mysqlConfig from "./config";

// 创建连接池
const pool = mysql.createPool(mysqlConfig as any);

// 开启事务
export const beginTransaction = async () => {
  // 开发环境中打印
  if (process.env.NODE_ENV === "development") {
    console.log("[sql]", "==> 开启事务");
  }
  // 从连接池中获取一条连接
  const conn = await pool.promise().getConnection();
  // 开启事务
  await conn.beginTransaction();
  return conn;
};

// 提交事务
export const commitTransaction = async (conn?: PoolConnection) => {
  if (conn) {
    // 开发环境中打印
    if (process.env.NODE_ENV === "development") {
      console.log("[sql]", "==> 提交事务");
    }
    // 提交事务
    await conn.commit();
    // 释放连接
    conn.release();
  }
};

// 回滚事务
export const rollbackTransaction = async (conn?: PoolConnection) => {
  // 开发环境中打印
  if (process.env.NODE_ENV === "development") {
    console.log("[sql]", "==> 回滚事务");
  }
  // 回滚事务
  await conn.rollback();
  // 释放连接
  conn.release();
};

// 使用事务执行SQL语句
export const transactionQuery = async <T>(
  sql: string,
  payload: T[] = [],
  conn: PoolConnection
): Promise<RowDataPacket[] | OkPacket | ResultSetHeader> => {
  // 开发环境中打印sql语句
  if (process.env.NODE_ENV === "development") {
    console.log("[sql]", mysql.format(sql, payload));
  }
  // 执行SQL语句
  const [rows] = await conn.execute<
    RowDataPacket[] | OkPacket | ResultSetHeader
  >(sql, payload);
  return rows;
};

// 批量使用事务执行SQL语句
export const transactionQueryBatch = async <T>(
  sql: string[],
  payload: T[][] = [],
  conn: PoolConnection
): Promise<(RowDataPacket[] | OkPacket | ResultSetHeader)[]> => {
  const rowsList: (RowDataPacket[] | OkPacket | ResultSetHeader)[] = [];

  for (let i = 0; i < sql.length; i++) {
    // 开发环境中打印sql语句
    if (process.env.NODE_ENV === "development") {
      console.log("[sql]", mysql.format(sql[0], payload[0]));
    }
    // 执行SQL语句
    const [rows] = await conn.execute<
      RowDataPacket[] | OkPacket | ResultSetHeader
    >(sql[0], payload[0]);
    rowsList.push(rows);
  }
  return rowsList;
};

// 自动事务执行SQL语句
export const autoTransactionQuery = async <T>(
  sql: string,
  payload: T[] = []
) => {
  // 从连接池中获取一条连接
  const conn = await pool.promise().getConnection();
  // 执行
  const rows = await transactionQuery(sql, payload, conn);
  // 释放连接
  conn.release();
  return rows;
};

// 批量自动事务执行SQL语句
export const autoTransactionQueryBatch = async <T>(
  sql: string[],
  payload: T[][] = [[]]
) => {
  // 从连接池中获取一条连接
  const conn = await pool.promise().getConnection();
  // 执行
  const rows = await transactionQueryBatch(sql, payload, conn);
  // 释放连接
  conn.release();
  return rows;
};

// 执行SQL语句
export const query = async <T>(
  sql: string | string[],
  payload: T[] | T[][] = [],
  conn?: PoolConnection,
  rawData?: boolean
) => {
  // 判断是否有多条SQL语句
  if (sql instanceof Array && payload[0] instanceof Array) {
    // 类型断言
    sql = sql as string[];
    payload = payload as T[][];
    const raw = conn
      ? await transactionQueryBatch(sql, payload, conn)
      : await autoTransactionQueryBatch(sql, payload);
    if (!rawData) {
      return JSON.parse(JSON.stringify(raw)) as any[];
    }
    return raw;
  } else {
    // 类型断言
    sql = sql as string;
    payload = payload as T[];
    const raw = conn
      ? await transactionQuery(sql, payload, conn)
      : await autoTransactionQuery(sql, payload);
    if (!rawData) {
      return JSON.parse(JSON.stringify(raw)) as any;
    }
    return raw;
  }
};
