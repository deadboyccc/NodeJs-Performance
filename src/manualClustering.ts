import cluster from "cluster"
import express from "express"

const app = express()

function doWork(msDuration: number) {
  const start = Date.now()
  while (Date.now() - start < msDuration) {
    // Simulate work :|
  }
}

app.get("/", (req, res, next) => {
  // doWork(5000)
  res.send("Hello World!")
})

if (cluster.isPrimary) {
  // Pimary (cluster manager) process
  const numCPUs = require("os").cpus().length // get number of cores

  console.log(`Master process ID: ${process.pid}`)

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    )
  })
} else {
  // Worker process
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} listening on port 3000`)
  })
}
