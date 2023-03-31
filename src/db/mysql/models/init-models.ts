import type { Sequelize } from "sequelize";
import { sysUser as _sysUser } from "./sysUser";
import type { sysUserAttributes, sysUserCreationAttributes } from "./sysUser";

export {
  _sysUser as sysUser,
};

export type {
  sysUserAttributes,
  sysUserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const sysUser = _sysUser.initModel(sequelize);


  return {
    sysUser: sysUser,
  };
}
