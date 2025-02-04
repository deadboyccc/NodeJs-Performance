import express from "express"
import { redisClient } from "./redisClient"

const app = express()

app.get("/", async (req, res) => {
  console.log(`process id = ${process.pid}`)
  const num = Number.parseInt(req.query.number as string, 10)
  if (num % 2 == 0) {
    redisClient.publish("sub1", num.toString())
    res.send("work completed - sent to sub1")
  } else {
    redisClient.publish("sub2", num.toString())
    res.send("work completed - sent to sub2")
  }
})
