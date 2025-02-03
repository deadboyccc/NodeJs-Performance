// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "MainExpress", // Replace with your app's name
      script: "./server.ts", // Path to your main TypeScript file
      interpreter: "ts-node", // Use ts-node to execute the script
      interpreter_args: [], // Any arguments you want to pass to ts-node
      instances: 2, // Number of instances to run (adjust as needed)
      exec_mode: "cluster",
      autorestart: true, // Automatically restart if the app crashes
      watch: false, // Watch for file changes and restart (set to true for development)
      max_memory_restart: "1G" // Restart if memory usage exceeds 1GB
    },
    {
      name: "worker1",
      script: "./workers/worker1.ts",
      interpreter: "ts-node", // Use ts-node to execute the script
      instances: 1
    },
    {
      name: "worker2",
      script: "./workers/worker2.ts",
      interpreter: "ts-node", // Use ts-node to execute the script
      instances: 1
    }
  ]
}
