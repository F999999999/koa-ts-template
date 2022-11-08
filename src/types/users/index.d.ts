declare namespace UserV1 {
  // 查询用户是否存在
  type FindUserByUserName = ModelFunction<
    FindUserByUserNameParams,
    FindUserByUserNameResult[]
  >;

  // 用户注册
  type UserRegister = ModelFunction<UserRegisterParams>;

  // 查询用户信息
  type FindUserInfo = ModelFunction<FindUserInfoParams, FindUserInfoResult[]>;
}
