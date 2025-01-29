const { parentPort, workerData } = require("worker_threads")

// Simulate a task - the data is posted from main thread
function performTask(data) {
  const { num } = data
  let result = 0
  for (let i = 0; i < num * 1e6; i++) {
    result += i % 2 === 0 ? i : -i
  }
  return result
}

// Perform the task and send the result back to the main thread
const result = performTask(workerData) // workerData coming from Main Thread
parentPort.postMessage(result) // sending the data back to the main thread

function doWork(msDuration) {
  const start = Date.now()
  while (Date.now() - start < msDuration) {
    // Simulate work  -time-based-
  }
}
