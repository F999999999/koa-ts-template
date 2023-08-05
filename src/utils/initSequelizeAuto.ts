import { SequelizeAuto } from 'sequelize-auto';
import { mysqlSequelize } from '@/db';
import { mysqlSequelizeAutoOptions } from '@/config/sequelizeAuto';

export const initMysqlSequelizeAuto = new SequelizeAuto(
  mysqlSequelize,
  null,
  null,
  mysqlSequelizeAutoOptions,
);

initMysqlSequelizeAuto
  .run()
  .then((data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(data.tables); // table and field list
      // console.log(data.foreignKeys); // table foreign key list
      // console.log(data.indexes); // table indexes
      // console.log(data.hasTriggerTables); // tables that have triggers
      // console.log(data.relations); // relationships between models
      // console.log(data.text); // text of generated models
    }
    console.log('生成mysql数据库模型成功');
  })
  .catch((err) => console.log(err));
