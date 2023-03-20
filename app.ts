import Koa from "koa";
import json from "koa-json";
import onerror from "koa-onerror";
import body from "koa-body";
import logger from "koa-logger";
import koaStatic from "koa-static";
import jwt from "koa-jwt";
import cors from "koa2-cors";
import dotenv from "dotenv";
// 配置 process.env
dotenv.config();
import { loadRouters } from "./src/routes";
import { refreshToken } from "./src/utils/jwt";
import { initModels } from "./src/db/sequelize/models/init-models";
import { sequelize } from "./src/db/sequelize";

export const app = new Koa();

// 使用 cors 处理跨域
app.use(cors());

// 错误处理
onerror(app);

// 中间件
// 使用 koa-jwt 中间件 未拦截客户端在调用接口时 如果请求头中没有设置 token 则返回 401
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        message: "没有访问权限",
      };
    } else {
      throw err;
    }
  });
});
// 设置哪些接口不需要 token
app.use(
  jwt({ secret: process.env.JWT_SECRET_KEY }).unless({
    path: [/^\/public/, /^\/users\/v1\/register/, /^\/users\/v1\/login/],
  })
);

// 刷新 token 有效期
app.use(async (ctx, next) => {
  await next();
  const token = ctx.request.headers?.authorization?.slice(7);
  // 判断是否有 token
  if (token) {
    // 判断是否需要刷新 token
    if (
      ctx.state.user.exp - new Date().getTime() / 1000 <
      (ctx.state.user.exp - ctx.state.user.iat) / 2
    ) {
      // 刷新 token 有效期
      const newToken = await refreshToken(token);
      if (!newToken.error && newToken.token !== token) {
        // 配置允许访问的自定义头信息
        ctx.set("Access-Control-Expose-Headers", "token");
        // 保存 token 到 headers
        ctx.set("token", newToken.token);
      }
    }
  }
});

app.use(body());
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + "/public"));

// 初始化sequelize模型
initModels(sequelize);

// 初始化自动加载路由
loadRouters(app);

// 日志记录
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 错误处理
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
