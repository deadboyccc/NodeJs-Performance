// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "Publisher Main", // Replace with your app's name
      script: "./server.ts", // Path to your main TypeScript file
      interpreter: "ts-node", // Use ts-node to execute the script
      interpreter_args: [], // Any arguments you want to pass to ts-node
      instances: 2, // Number of instances to run (adjust as needed)
      exec_mode: "cluster",
      autorestart: true, // Automatically restart if the app crashes
      watch: true, // Watch for file changes and restart (set to true for development)
      max_memory_restart: "1G" // Restart if memory usage exceeds 1GB
    },
    {
      name: "sub1",
      script: "./subscribers/sub1.ts",
      interpreter: "ts-node", // Use ts-node to execute the script
      watch: true, // Watch for file changes and restart (set to true for development)
      instances: 1
    },
    {
      name: "sub2",
      script: "./subscribers/sub2.ts",
      interpreter: "ts-node", // Use ts-node to execute the script
      watch: true, // Watch for file changes and restart (set to true for development)
      instances: 1
    }
  ]
};
