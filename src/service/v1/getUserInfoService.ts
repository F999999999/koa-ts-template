import { findUserInfoModel } from '@/model/users/v1';
import { cryptoPassword } from '@/utils/crypto';
import { resultJson } from '@/utils/resultJson';

export const getUserInfoService = async (
  username: string,
  password: string
) => {
  // 获取用户信息
  const user = await findUserInfoModel({
    username,
    password: cryptoPassword(password),
  });
  // 判断是否查找到用户
  if (user.length > 0) {
    // 返回 用户信息以及token
    return resultJson.success({
      msg: '获取信息成功',
      data: {
        id: user[0].id,
        username: user[0].username,
        state: user[0].state,
      },
    });
  } else {
    // 获取信息失败
    return resultJson.fail({
      msg: '获取信息失败,请检查用户名或者密码是否正确',
      errorCode: -1,
    });
  }
};
