import express from "express"
import { createClient } from "redis"

import mongoose from "mongoose"
import textRouter from "./textRouter"

const app = express()
const port = process.env.PORT || 3000

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/redis")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err))

// connecting to Redis

// Create Redis client
export const redisClient = createClient({
  url: "redis://localhost:6379"
})
;(async () => {
  try {
    await redisClient.connect() // Ensure the Redis client connects before usage
    console.log("Connected to Redis")

    // Set initial value in Redis
    await redisClient.hSet("German", "blue", "azul")
  } catch (error) {
    console.error("Redis connection error:", error)
  }
})()

// Route to fetch value from Redis
app.get("/", async (req, res) => {
  try {
    const name = await redisClient.hGet("German", "blue")
    res.send(`Hello, ${name || "Guest"}!`)
  } catch (error) {
    console.error("Error fetching from Redis:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.use(express.json())
// Define a simple route to test the redis caching on the textModel resource
app.use("/text", textRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
