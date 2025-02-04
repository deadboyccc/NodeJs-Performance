import { fibonacciSeriesOptimized } from "../../IPC_Pattern/mathLogic/fib";
import { createClient } from "redis";

// Create Redis client
const redisClient = createClient({
  url: "redis://localhost:6379"
});
(async () => {
  try {
    await redisClient.connect(); // Ensure the Redis client connects before usage
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Redis connection error:", error);
  }
})();
(async () => {
  try {
    await redisClient.subscribe("sub2", (msg, _ch) => {
      const num = Number.parseInt(msg, 10);

      if (isNaN(num)) {
        console.error(`[sub2][${process.pid}] Received invalid number: ${msg}`);
        return;
      }

      const result = fibonacciSeriesOptimized(num);
      console.log(`[sub2][${process.pid}] fib(${num}) = ${result}`);
    });

    console.log(`[sub2][${process.pid}] Subscribed to sub2`);
  } catch (error) {
    console.error(`[sub2][${process.pid}] Subscription failed:`, error);
  }
})();
