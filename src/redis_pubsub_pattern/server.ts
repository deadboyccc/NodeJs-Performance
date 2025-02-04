import express from "express";
import { createClient } from "redis";

const app = express();

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

app.get("/", async (req, res) => {
  console.log(`process id = ${process.pid}`);
  const num = Number.parseInt(req.query.number as string, 10);
  if (num % 2 == 0) {
    redisClient.publish("sub1", num.toString());
    res.status(200).json({ message: "work completed - sent to sub1" });
  } else {
    redisClient.publish("sub2", num.toString());
    res.status(200).json({ message: "work completed - sent to sub2" });
  }
});

app.listen(3000, () => {
  console.log(`running on port 3000`);
});
