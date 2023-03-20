# koa-ts-template
使用Koa+ts编写的后端API模板
# 特性
- ⚡️ [Koa](https://koajs.com/) - node.js 的下一代web框架
- 💪 [Typescript](https://www.typescriptlang.org/) - 当然！必不可少
- 🔑 [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - node.js 的 JsonWebToken 实现，用于用户鉴权
- 🛡️ [Koa](https://koajs.com/) - 让您可以使用简单、直观和可读的语言来描述您的数据
- 📊 [Sequelize](https://sequelize.org/) - 具有可靠的事务支持、关系、急切和延迟加载、读取复制的ORM工具
## .env
```env
PORT=3000

DEVELOPMENT_MYSQL_HOST="localhost"
DEVELOPMENT_MYSQL_PORT=3306
DEVELOPMENT_MYSQL_USERNAME="root"
DEVELOPMENT_MYSQL_PASSWORD="123456"
DEVELOPMENT_MYSQL_DATABASE="test"

TEST_MYSQL_HOST="localhost"
TEST_MYSQL_PORT=3306
TEST_MYSQL_USERNAME="root"
TEST_MYSQL_PASSWORD="123456"
TEST_MYSQL_DATABASE="test"

PRODUCTION_MYSQL_HOST="localhost"
PRODUCTION_MYSQL_PORT=3306
PRODUCTION_MYSQL_USERNAME="root"
PRODUCTION_MYSQL_PASSWORD="123456"
PRODUCTION_MYSQL_DATABASE="test"

PASSWORD_SECRET_KEY="password"
JWT_SECRET_KEY="jwt"
```
## 启动服务
    # 开发环境
    pnpm run dev
    # 生产环境
    pnpm run prod
    # 测试环境
    pnpm run test
## 使用模型初始化数据库
    # 开发环境
    pnpm run devinitdb
    # 生产环境
    pnpm run prodinitdb
    # 测试环境
    pnpm run testinitdb
## 生成数据库模型
    # 开发数据库
    pnpm run devmodel
    # 生产数据库
    pnpm run prodmodel
    # 测试数据库
    pnpm run testmodel
