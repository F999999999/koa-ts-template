export const resultJson = {
  success: (params: { msg?: string; data?: any }) => {
    return {
      code: 1, // 返回的接口调用状态码，0-失败，1-成功
      msg: params.msg || "成功", // 返回的提示信息
      data: params.data || null, // 返回的数据
    };
  },
  fail: (params: { msg?: string; data?: any; errorCode?: number }) => {
    return {
      code: 0, // 返回的接口调用状态码，0-失败，1-成功
      msg: params.msg || "失败", // 返回的提示信息
      data: params.data || null, // 返回的数据
      error_code: params.errorCode || 0, // 返回接口异常信息码
    };
  },
};
