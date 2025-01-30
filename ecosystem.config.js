// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "YourAppName", // Replace with your app's name
      script: "./src/redis/app.ts", // Path to your main TypeScript file
      interpreter: "ts-node", // Use ts-node to execute the script
      interpreter_args: [], // Any arguments you want to pass to ts-node
      instances: "MAX", // Number of instances to run (adjust as needed)
      autorestart: true, // Automatically restart if the app crashes
      watch: false, // Watch for file changes and restart (set to true for development)
      max_memory_restart: "1G", // Restart if memory usage exceeds 1GB
      env: {
        // Environment variables for production
        NODE_ENV: "production"
      },
      env_development: {
        // Environment variables for development
        NODE_ENV: "development"
      }
    }
  ]
}
