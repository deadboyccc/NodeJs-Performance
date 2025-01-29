import { Worker } from "worker_threads"

// Function to run a task in a worker thread (with different event listners)
function runWorkerTask(workerData: any) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData })

    worker.on("message", (result) => resolve(result))
    worker.on("error", (err) => reject(err))
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

// Pass some data to the worker thread - as an obj
;(async () => {
  try {
    const result = await runWorkerTask({ num: 10 })
    console.log("Result from worker:", result)
  } catch (err) {
    console.error("Error from worker:", err)
  }
})()
