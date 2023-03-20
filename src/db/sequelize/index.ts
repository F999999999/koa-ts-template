import { Sequelize } from "sequelize";
import { options } from "./config";

export const sequelize = new Sequelize(options);

// 测试数据库链接
sequelize
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err: any) => {
    // 数据库连接失败时打印输出
    console.error(err);
    console.log("数据库连接失败");
    throw err;
  });
