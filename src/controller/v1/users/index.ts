import * as Joi from "joi";
import * as jwt from "jsonwebtoken";
import {
  findUserByUserName,
  userRegister,
  findUserInfo,
} from "@/model/v1/users";
import { cryptoPassword } from "@/utils/crypto";

// 注册
export const register = async (ctx) => {
  const { username, password } = ctx.request.body;
  // 校验参数
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
    repeat_password: Joi.ref(password),
  });
  // 校验
  const verify = schema.validate({ username, password });
  // 判断校验结果
  if (!verify.error) {
    // 检测用户是否已注册
    const user = await findUserByUserName({ username });
    // 如果用户已注册 终止注册操作并返回
    if (user.length > 0) {
      return (ctx.body = {
        status: 0,
        message: "您已注册，无需重复注册",
      });
    }

    // 注册
    const userRegisterResult = await userRegister({
      username,
      password: cryptoPassword(password),
    });
    if (userRegisterResult.affectedRows > 0) {
      ctx.body = {
        status: 200,
        message: "注册成功",
      };
    } else {
      ctx.body = {
        status: 0,
        message: "注册失败",
      };
    }
  } else {
    // 参数校验失败
    ctx.body = {
      status: 0,
      message: "请输入正确的参数",
    };
  }
};

// 登录
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  // 校验参数
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
  });
  // 校验
  const verify = schema.validate({ username, password });
  // 判断校验结果
  if (!verify.error) {
    // 获取用户信息
    const user = await findUserInfo({
      username,
      password: cryptoPassword(password),
    });
    // 判断是否查找到用户
    if (user.length > 0) {
      // 生成 token
      const token = jwt.sign(
        {
          id: user[0].id,
          username,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 * 24 * 7 }
      );
      // 返回 用户信息以及token
      ctx.body = {
        status: 200,
        message: "登录成功",
        data: {
          id: user[0].id,
          username: user[0].username,
          token,
        },
      };
    } else {
      // 登录失败
      ctx.body = {
        status: 0,
        message: "登录失败,请检查用户名或者密码是否正确",
      };
    }
  } else {
    // 参数校验失败
    ctx.body = {
      status: 0,
      message: "请输入正确的参数",
    };
  }
};

// 信息
export const Info = (ctx) => {
  ctx.body = {
    status: 200,
    message: "获取成功",
    data: {
      name: "九玖",
      age: 18,
    },
  };
};
