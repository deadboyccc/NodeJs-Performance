import express from "express"
import redis from "redis"
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

const redisClient = redis.createClient({
  url: "redis://localhost:6379"
})
redisClient.set("name", "Ahmed")

app.get("/", async (req, res) => {
  const name = await redisClient.get("name")
  res.send(`Hello, ${name}!`)
})

app.use(express.json())
// Define a simple route to test the redis caching on the textModel resource
app.use("/text", textRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
