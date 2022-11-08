// 查询用户是否存在
interface FindUserByUserNameParams {
  username: string;
}

interface FindUserByUserNameResult {
  id: number;
  username: string;
}

// 用户注册
interface UserRegisterParams {
  username: string;
  password: string;
  isState?: number;
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
