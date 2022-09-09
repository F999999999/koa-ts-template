module.exports = {
  apps: [
    {
      //pm2名字
      name: "koa_serve",
      //pm2运行脚本
      script: "bin/www.ts",
      //环境变量
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    // "production" 环境名称
    production: {
      // post-deploy action
      "post-deploy": "pm2 reload ecosystem.config.ts --env production",
      // "post-deploy": "npm install && pm2 reload ecosystem.config.ts --env production",
    },
  },
};
