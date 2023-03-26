const mysql = {
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

export default { mysql };
