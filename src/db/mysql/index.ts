import mysql, { PoolConnection, QueryOptions } from "mysql2";

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
  await conn.rollback(() => {});
  // 释放连接
  conn.release();
};

// 使用事务执行SQL语句
export const transactionQuery = async <T>(
  sql: string | string[],
  payload: T[] | T[][] = [],
  conn?: PoolConnection
) => {
  // 判断是否有多条SQL语句
  if (Array.isArray(sql)) {
    const rows = [];
    for (let i = 0; i < sql.length; i++) {
      // 开发环境中打印sql语句
      if (process.env.NODE_ENV === "development") {
        console.log("[sql]", mysql.format(sql[i], payload[i]));
      }
      // 执行SQL语句
      const [row]: any = await conn.execute(
        sql[i] as unknown as QueryOptions,
        payload[i]
      );
      rows.push(row);
    }
    return rows;
  } else {
    // 开发环境中打印sql语句
    if (process.env.NODE_ENV === "development") {
      console.log("[sql]", mysql.format(sql, payload));
    }
    // 执行SQL语句
    const [rows]: any = await conn.execute(
      sql as unknown as QueryOptions,
      payload
    );
    return rows;
  }
};

// 自动事务执行SQL语句
export const autoTransactionQuery = async <T>(
  sql: string | string[],
  payload: T[] = []
) => {
  // 从连接池中获取一条连接
  const conn = await pool.promise().getConnection();
  const rows = transactionQuery(sql, payload);
  // 释放连接
  conn.release();
  return rows;
};

// 执行SQL语句
export const query = async <T>(
  sql: string | string[],
  payload: T[] = [],
  conn?: PoolConnection
) => {
  if (conn) {
    return await transactionQuery(sql, payload, conn);
  } else {
    return await autoTransactionQuery(sql, payload);
  }
};
