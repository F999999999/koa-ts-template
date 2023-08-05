import { ModelStatic, Sequelize } from 'sequelize';
import { mysqlSequelizeOptions } from '@/config/sequelize';

export const mysqlSequelize = new Sequelize(mysqlSequelizeOptions);

// 测试数据库链接
const testSequelize = (sequelize: Sequelize) => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('数据库连接成功');
    })
    .catch((err) => {
      console.log('数据库连接失败');
      throw err;
    });
};
testSequelize(mysqlSequelize);

type MysqlModel = {
  [modelName in keyof typeof mysqlSequelize.models]: ModelStatic<any>;
};

export const mysql: MysqlModel = mysqlSequelize.models;
