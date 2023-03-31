module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    // 生产环境禁用 console
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 生产环境禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
