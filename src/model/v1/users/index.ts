import { sysUser } from "@/db/sequelize/models/sysUser";
import { Op } from "sequelize";

// 查询用户是否存在
export const findUserByUserName = async ({ username }) => {
  return await sysUser.findOne<sysUser>({
    attributes: ["id"],
    where: { username },
    raw: true,
  });
};

// 用户注册
export const userRegister = async ({ username, password, state = 1 }) => {
  return await sysUser.create({
    username,
    password,
    state,
  });
};

// 查询用户信息
export const findUserInfo = async ({ username, password }) => {
  return await sysUser.findAll({
    attributes: ["id", "username", "state"],
    where: { [Op.and]: [{ username }, { password }] },
    raw: true,
  });
};
