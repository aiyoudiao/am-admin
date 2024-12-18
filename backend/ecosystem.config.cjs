const path = require('path');
const { cpus } = require('node:os');

const cpuLen = cpus().length;

const env = {
  env: {
    NODE_ENV: 'production',
  },
  env_production: {
    NODE_ENV: 'production',
  },
  env_development: {
    NODE_ENV: 'development',
  },
};

module.exports = {
  apps: [
    {
      name: 'am-admin-backend',
      cwd: path.resolve(__dirname, './'),
      script: './dist/apps/backend/src/main.js',
      autorestart: true,
      exec_mode: 'cluster',
      watch: false,
      instances: 1,
      max_memory_restart: '1G',
      args: '',
      env: {
        NODE_ENV: 'production',
        PORT: 6688,
      },
    },
  ],
};
