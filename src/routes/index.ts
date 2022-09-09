import requireDirectory from "require-directory";
import Koa from "koa";
import Router from "koa-router";

// 自动加载路由
export const loadRouters = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  requireDirectory(module, {
    visit: (obj: Router) => {
      if (obj instanceof Router) {
        app.use(obj.routes()).use(obj.allowedMethods());
      }
    },
    extensions: ["ts"],
  });
};
