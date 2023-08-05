import joi from 'joi';
import { resultJson } from '@/utils/resultJson';
import { userRegisterService } from '@/service/v1/userRegisterService';
import { userLoginService } from '@/service/v1/userLoginService';
import { getUserInfoService } from '@/service/v1/getUserInfoService';

// 注册
export const register = async (ctx) => {
  const { username, password } = ctx.request.body;
  // 校验参数
  const verify = joi
    .object({
      username: joi.string().min(4).max(20).required(),
      password: joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
      repeat_password: joi.ref(password),
    })
    .validate({ username, password });
  // 判断校验结果
  if (verify.error) {
    // 参数校验失败
    return (ctx.body = resultJson.fail({ msg: '请输入正确的参数' }));
  }

  // 注册
  ctx.body = await userRegisterService(username, password);
};

// 登录
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  // 校验参数
  const verify = joi
    .object({
      username: joi.string().min(4).max(20).required(),
      password: joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
    })
    .validate({ username, password });
  // 判断校验结果
  if (verify.error) {
    // 参数校验失败
    return (ctx.body = resultJson.fail({ msg: '请输入正确的参数' }));
  }

  // 登录
  ctx.body = await userLoginService(username, password);
};

// 信息
export const info = async (ctx) => {
  const { username, password } = ctx.query;
  // 校验参数
  const verify = joi
    .object({
      username: joi.string().min(4).max(20).required(),
      password: joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
    })
    .validate({ username, password });
  // 判断校验结果
  if (verify.error) {
    // 参数校验失败
    return (ctx.body = resultJson.fail({ msg: '请输入正确的参数' }));
  }

  ctx.body = await getUserInfoService(username, password);
};
