import { AutoOptions } from 'sequelize-auto';

export const mysqlSequelizeAutoOptions: AutoOptions = {
  // 文件输出路径
  directory: 'src/db/mysql/models',
  // 模型输出语言 es5、es6、esm、ts
  lang: 'ts',
  // convert snake_case column names to camelCase field names: user_id -> userId
  // 变量名样式：“c” camelCase | “l” lower_case | “o” original (db) | “p” PascalCase | “u” UPPER_CASE
  caseModel: 'c',
  // 文件名样式：“c” camelCase | “k” kebab-case | “l” lower_case | “o” original (db) | “p” PascalCase | “u” UPPER_CAS
  caseFile: 'c',
  // 是否将复数表名转换为单数表名
  singularize: true,
  // 使用 sequelize.define 代替 init 初始化模型
  useDefine: true,
  // 是否避免在关系中创建别名(as)属性
  noAlias: true,
  // 是否禁止生成 init-models 文件
  noInitModels: false,
};
