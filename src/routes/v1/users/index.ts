import Router from "koa-router";
import { register, login, Info } from "@/controller/v1/users";

const router = new Router({ prefix: "/v1/users" });
// 注册
router.post("/register", register);
// 登录
router.post("/login", login);
// 信息
router.get("/info", Info);

module.exports = router;
