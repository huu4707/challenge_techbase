require('dotenv').config();
module.exports = {
  apps: [
    {
      name: 'gateway',
      script: 'dist/run/index.js',
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,

      autorestart: true,
      watch: false,
      // max_memory_restart: '1G',
      env: {
        NODE_NAME: 'gateway'
      }
    },
    {
      name: 'about-us-service',
      script: 'dist/run/index.js',
      args: 'one two',
      instances: 1,

      autorestart: true,
      watch: false,
      // max_memory_restart: '1G',
      env: {
        NODE_NAME: 'about-us-service'
      }
    },
    {
      name: 'clinic-service',
      script: 'dist/run/index.js',
      instances: 1,

      autorestart: true,
      watch: false,
      // max_memory_restart: '1G',
      env: {
        NODE_NAME: 'clinic-service'
      }
    },
    {
      name: 'customer-service',
      script: 'dist/run/index.js',
      // args: 'one two',
      instances: 1,

      autorestart: true,
      // watch: true,
      env: {
        NODE_NAME: 'customer-service'
      }
    },
    {
      name: 'doctor-service',
      script: 'dist/run/index.js',
      // args: 'one two',
      instances: 1,

      autorestart: true,
      // watch: true,
      env: {
        NODE_NAME: 'doctor-service'
      }
    },
    {
      name: 'news-service',
      script: 'dist/run/index.js',
      // args: 'one two',
      instances: 1,

      autorestart: true,
      // watch: true,
      env: {
        NODE_NAME: 'news-service'
      }
    },
    {
      name: 'order-service',
      script: 'dist/run/index.js',
      // args: 'one two',
      instances: 1,

      autorestart: true,
      // watch: true,
      env: {
        NODE_NAME: 'order-service'
      }
    },
    {
      name: 'recruitment-service',
      script: 'dist/run/index.js',
      // args: 'one two',
      instances: 1,

      autorestart: true,
      // watch: true,
      env: {
        NODE_NAME: 'recruitment-service'
      }
    },
    {
      name: 'service-service',
      script: 'dist/run/index.js',
      // args: 'one two',
      instances: 1,

      autorestart: true,
      // watch: true,
      env: {
        NODE_NAME: 'service-service'
      }
    }
  ]
};
