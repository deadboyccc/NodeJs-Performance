import express from "express"
import { doWorkThreadOne } from "./masterClusters/thread1"
import { doWorkThreadTwo } from "./masterClusters/thread2"

const app = express()

app.get("/", async (req, res, next) => {
  try {
    let num = Number.parseInt(req.query.number as string, 10)
    if (num % 2 == 0) {
      await doWorkThreadTwo(num)
    } else {
      await doWorkThreadOne(num)
    }
    console.log("Work completed")
  } catch (err) {
    console.error("Error occurred:", err)
  } finally {
    res.send("Done")
  }
})

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})
