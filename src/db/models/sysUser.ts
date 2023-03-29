import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface sysUserAttributes {
  id: number;
  username: string;
  password: string;
  state: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export type sysUserPk = 'id';
export type sysUserId = sysUser[sysUserPk];
export type sysUserOptionalAttributes =
  | 'id'
  | 'state'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at';
export type sysUserCreationAttributes = Optional<
  sysUserAttributes,
  sysUserOptionalAttributes
>;

export class sysUser
  extends Model<sysUserAttributes, sysUserCreationAttributes>
  implements sysUserAttributes
{
  id!: number;
  username!: string;
  password!: string;
  state!: number;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof sysUser {
    return sequelize.define(
      'sysUser',
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          comment: 'ID',
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: '用户名称',
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: '密码',
        },
        state: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          comment: '状态',
        },
      },
      {
        tableName: 'sys_user',
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    ) as typeof sysUser;
  }
}
