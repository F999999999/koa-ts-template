import { PoolConnection, ResultSetHeader } from "mysql2";

// 查询用户是否存在
interface FindUserByUserNameParams {
  username: string;
}
interface FindUserByUserNameResult {
  id: number;
  username: string;
}
export interface FindUserByUserName {
  (payload: FindUserByUserNameParams, conn?: PoolConnection): Promise<
    FindUserByUserNameResult[]
  >;
}

// 用户注册
interface UserRegisterParams {
  username: string;
  password: string;
  isState?: number;
}
export interface UserRegister {
  (
    payload: UserRegisterParams,
    conn?: PoolConnection
  ): Promise<ResultSetHeader>;
}

// 查询用户信息
interface FindUserInfoParams {
  username: string;
  password: string;
}
interface FindUserInfoResult {
  id: number;
  username: string;
  age: number;
}
export interface FindUserInfo {
  (payload: FindUserInfoParams, conn?: PoolConnection): Promise<
    FindUserInfoResult[]
  >;
}
