import { query } from "@/db/mysql";
import { PoolConnection } from "mysql2";
import { FindUserByUserName, FindUserInfo, UserRegister } from "users";

// 查询用户是否存在
export const findUserByUserName: FindUserByUserName = async (
  { username },
  conn
) => {
  return await query(
    "SELECT id FROM sys_user WHERE username=?",
    [username],
    conn
  );
};

// 用户注册
export const userRegister: UserRegister = async (
  { username, password, isState = 1 },
  conn
) => {
  return await query(
    "INSERT INTO sys_user(username, password,state) VALUES(?,?,?)",
    [username, password, isState],
    conn
  );
};

// 查询用户信息
export const findUserInfo: FindUserInfo = async (
  { username, password },
  conn: PoolConnection | null = null
) => {
  return await query(
    "SELECT id,username,password,state FROM sys_user WHERE username= ? AND password = ?",
    [username, password],
    conn
  );
};
