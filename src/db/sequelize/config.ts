import { Options } from "sequelize";

// mysql 数据库连接配置
export const config = {
  // 主机地址
  host: process.env[`${process.env.NODE_ENV}_MYSQL_HOST`],
  // 端口
  port: process.env[`${process.env.NODE_ENV}_MYSQL_PORT`],
  // 用户名
  username: process.env[`${process.env.NODE_ENV}_MYSQL_USERNAME`],
  // 密码
  password: process.env[`${process.env.NODE_ENV}_MYSQL_PASSWORD`],
  // 数据库名称
  database: process.env[`${process.env.NODE_ENV}_MYSQL_DATABASE`],
};

// sequelize 配置选项
export const options: Options = {
  // 数据库类型
  dialect: "mysql",
  // 数据库地址
  host: config.host,
  // 数据库端口
  port: +config.port || 3306,
  // 用户名
  username: config.username,
  // 密码
  password: config.password,
  // 数据库名称
  database: config.database,
  // 时区
  timezone: "+08:00",
  // 执行过程打印sql的日志参数
  // logging: console.log,                  // 默认值,显示日志函数调用的第一个参数
  // logging: (...log) => console.log(log), // 显示所有日志函数调用参数
  // logging: false,                        // 禁用日志记录
  // logging: log => logger.debug(log),     // 使用自定义记录器(例如Winston 或 Bunyan),显示第一个参数
  // logging: logger.debug.bind(logger)     // 使用自定义记录器的另一种方法,显示所有消息
  logging: (log) => console.log("dbLog:", log),
  // 连接池配置
  pool: {
    // 连接池最小连接数量
    min: 0,
    // 连接池最大链接数量
    max: 5,
    // 连接在被释放之前可以空闲的最长时间（以毫秒为单位）
    idle: 10000,
  },
  define: {
    // 添加 createdAt 和 updatedAt 时间戳字段
    timestamps: true,
    // 使用deletedAt字段对数据进行删除
    paranoid: true,
    // 使用下划线(_)作为连接符（默认是驼峰）
    underscored: true,
    // 不把表名修改为复数
    freezeTableName: true,
  },
};
