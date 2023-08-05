import { findUserInfoModel } from '@/model/users/v1';
import { cryptoPassword } from '@/utils/crypto';
import { createToken } from '@/utils/jwt';
import { resultJson } from '@/utils/resultJson';

export const userLoginService = async (username: string, password: string) => {
  // 获取用户信息
  const user = await findUserInfoModel({
    username,
    password: cryptoPassword(password),
  });
  // 判断是否查找到用户
  if (user.length > 0) {
    // 生成 token
    const token = createToken({ id: user[0].id, username });
    // 返回 用户信息以及token
    return resultJson.success({
      msg: '登录成功',
      data: {
        id: user[0].id,
        username: user[0].username,
        token,
      },
    });
  } else {
    // 登录失败
    return resultJson.fail({
      msg: '登录失败,请检查用户名或者密码是否正确',
      errorCode: -1,
    });
  }
};
