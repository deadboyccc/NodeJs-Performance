import express from "express"

import cluster from "cluster"
import { cpus } from "os"
import { Worker } from "worker_threads"
if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)
  //creating workers
  const worker1 = new Worker("./workers/worker1.js")
  const worker2 = new Worker("./workers/worker2.js")

  // loggint their thread id
  console.log(`Worker ${worker1.threadId} started`) // Use threadId for worker_threads
  console.log(`Worker ${worker2.threadId} started`)

  // error handling for workers
  worker1.on("error", (err) => console.error(`worker1 error: ${err}`))
  worker2.on("error", (err) => console.error(`worker2 error: ${err}`))
  //msg event
  worker1.on("message", (msg) => console.log(`worker1 sent to main: ${msg}`))
  worker2.on("message", (msg) => console.log(`worker2 sent to main: ${msg}`))
  //fork 2 more processes (4 cores -2 workers = 2 processes to handle requests for the express app)
  cluster.on("online", (w) => {
    console.log(`Worker ${w.process.pid} is online `)
    // if worker is online then check for their msgs
    w.on("message", (num) => {
      console.log(`Worker ${w.process.pid} received message: ${num}`)
      // sending the message to the main node thread
      if (num % 2 == 0) {
        worker1.emit(num)
      } else {
        worker2.emit(num)
      }
    })
  })
  for (let i = 0; i < cpus.length - 2; i++) {
    let worker = cluster.fork()
    // Logging the id of the fork pid
    console.log(`Worker ${worker.process.pid} started`)
  }
} else {
  // main node thread(2# cluster)
  const app = express()
  app.get("/", (req, res: any) => {
    process.send!(req.query.number)
    console.log(`pid: ${process.pid} recieved the request `)
    res.end("the end of the request!")
  })

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`)
  })
}
