import { findUserByUserNameModel, userRegisterModel } from '@/model/users/v1';
import { cryptoPassword } from '@/utils/crypto';
import { mysqlSequelize } from '@/db';
import { resultJson } from '@/utils/resultJson';

export const userRegisterService = async (
  username: string,
  password: string
) => {
  // 检测用户是否已注册
  const user = await findUserByUserNameModel({ username });
  // 如果用户已注册 终止注册操作并返回
  if (user?.username) {
    return resultJson.fail({
      msg: '您已注册，无需重复注册',
      errorCode: -1,
    });
  }

  try {
    const user = await mysqlSequelize.transaction(async (t) => {
      // 执行注册操作
      return await userRegisterModel(
        {
          username,
          password: cryptoPassword(password),
        },
        t
      );
    });
    return resultJson.success({
      msg: '注册成功',
      data: { id: user.id, username: user.username },
    });
  } catch (err) {
    return resultJson.fail({ msg: '注册失败' });
  }
};
