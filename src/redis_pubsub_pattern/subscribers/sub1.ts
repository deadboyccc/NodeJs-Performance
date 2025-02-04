import { fibonacciSeriesOptimized } from "../../IPC_Pattern/mathLogic/fib";
import { redisClient } from "../redisClient";
(async () => {
  try {
    await redisClient.subscribe("sub1", (msg, _ch) => {
      const num = Number.parseInt(msg, 10);

      if (isNaN(num)) {
        console.error(`[sub1][${process.pid}] Received invalid number: ${msg}`);
        return;
      }

      const result = fibonacciSeriesOptimized(num);
      console.log(`[sub1][${process.pid}] fib(${num}) = ${result}`);
    });

    console.log(`[sub1][${process.pid}] Subscribed to sub2`);
  } catch (error) {
    console.error(`[sub1][${process.pid}] Subscription failed:`, error);
  }
})();
