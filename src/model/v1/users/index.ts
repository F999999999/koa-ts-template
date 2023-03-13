import { query } from "@/db/mysql";

// 查询用户是否存在
export const findUserByUserName: UserV1.FindUserByUserName = async (
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
export const userRegister: UserV1.UserRegister = async (
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
export const findUserInfo: UserV1.FindUserInfo = async (
  { username, password },
  conn
) => {
  return await query(
    "SELECT id,username,state FROM sys_user WHERE username= ? AND password = ?",
    [username, password],
    conn
  );
};
