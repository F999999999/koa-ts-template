import { Op, Transaction } from 'sequelize';
import { mysql } from '@/db';
import { sysUser } from '@/db/models/mysql/sysUser';

// 查询用户是否存在
export const findUserByUserNameModel = async ({ username }) => {
  return await mysql.sysUser.findOne<sysUser>({
    attributes: ['username'],
    where: { username },
    raw: true,
  });
};

// 用户注册
export const userRegisterModel = async (
  { username, password, state = 1 },
  transaction?: Transaction
) => {
  return await mysql.sysUser.create<sysUser>(
    {
      username,
      password,
      state,
    },
    { transaction }
  );
};

// 查询用户信息
export const findUserInfoModel = async ({ username, password }) => {
  return await mysql.sysUser.findAll<sysUser>({
    attributes: ['id', 'username', 'state'],
    where: { [Op.and]: [{ username }, { password }] },
    raw: true,
  });
};
