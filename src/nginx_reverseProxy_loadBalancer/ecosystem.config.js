module.exports = {
  apps: [
    {
      name: "api1",
      script: "./server.ts",
      args: "api1",
      interpreter: "ts-node",
      interpreter_args: [],
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3000
      }
    },
    {
      name: "api2",
      script: "./server.ts",
      args: "api2",
      interpreter: "ts-node",
      interpreter_args: [],
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3001
      }
    },
    {
      name: "api3",
      script: "./server.ts",
      args: "api3",
      interpreter: "ts-node",
      interpreter_args: [],
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3002
      }
    },
    {
      name: "api4",
      script: "./server.ts",
      args: "api4",
      interpreter: "ts-node",
      interpreter_args: [],
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3003
      }
    }
  ]
};
