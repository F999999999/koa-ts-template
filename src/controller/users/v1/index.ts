import joi from "joi";
import jwt from "jsonwebtoken";
import {
  findUserByUserName,
  userRegister,
  findUserInfo,
} from "@/model/users/v1";
import { resultJson } from "@/utils/resultJson";
import { cryptoPassword } from "@/utils/crypto";

// 注册
export const register = async (ctx) => {
  const { username, password } = ctx.request.body;
  // 校验参数
  const schema = joi.object({
    username: joi.string().min(4).max(20).required(),
    password: joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
    repeat_password: joi.ref(password),
  });
  // 校验
  const verify = schema.validate({ username, password });
  // 判断校验结果
  if (verify.error) {
    // 参数校验失败
    return (ctx.body = resultJson.fail({
      msg: "请输入正确的参数",
    }));
  }

  // 检测用户是否已注册
  const user = await findUserByUserName({ username });
  // 如果用户已注册 终止注册操作并返回
  if (user.id) {
    return (ctx.body = resultJson.fail({
      msg: "您已注册，无需重复注册",
      errorCode: -1,
    }));
  }

  try {
    // 执行注册操作
    await userRegister({
      username,
      password: cryptoPassword(password),
    });
    ctx.body = resultJson.success({ msg: "注册成功" });
  } catch (e) {
    ctx.body = resultJson.fail({
      msg: "注册失败",
    });
  }
};

// 登录
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  // 校验参数
  const schema = joi.object({
    username: joi.string().min(4).max(20).required(),
    password: joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
  });
  // 校验
  const verify = schema.validate({ username, password });
  // 判断校验结果
  if (verify.error) {
    // 参数校验失败
    return (ctx.body = resultJson.fail({
      msg: "请输入正确的参数",
    }));
  }

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
    ctx.body = resultJson.success({
      msg: "登录成功",
      data: {
        id: user[0].id,
        username: user[0].username,
        token,
      },
    });
  } else {
    // 登录失败
    ctx.body = resultJson.fail({
      msg: "登录失败,请检查用户名或者密码是否正确",
      errorCode: -1,
    });
  }
};

// 信息
export const Info = async (ctx) => {
  const { username, password } = ctx.query;
  // 校验参数
  const schema = joi.object({
    username: joi.string().min(4).max(20).required(),
    password: joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
  });
  // 校验
  const verify = schema.validate({ username, password });
  // 判断校验结果
  if (verify.error) {
    // 参数校验失败
    return (ctx.body = resultJson.fail({
      msg: "请输入正确的参数",
    }));
  }

  // 获取用户信息
  const user = await findUserInfo({
    username,
    password: cryptoPassword(password),
  });
  // 判断是否查找到用户
  if (user.length > 0) {
    // 返回 用户信息以及token
    ctx.body = resultJson.success({
      msg: "登录成功",
      data: {
        id: user[0].id,
        username: user[0].username,
        state: user[0].state,
      },
    });
  } else {
    // 获取信息失败
    ctx.body = resultJson.fail({
      msg: "获取信息失败,请检查用户名或者密码是否正确",
      errorCode: -1,
    });
  }
};
