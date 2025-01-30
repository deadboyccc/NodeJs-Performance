import { Kafka } from "kafkajs"
import { Worker } from "worker_threads"
import path from "path"

// Kafka client
const kafka = new Kafka({
  clientId: "main-thread",
  brokers: ["localhost:9092"]
})

// Function to create and manage the worker thread
const runWorkerTask = async (message: string) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, "worker.js"), {
      workerData: { message }
    })

    worker.on("message", (processedMessage) => {
      console.log(`Main thread received from worker: ${processedMessage}`)
      resolve(processedMessage)
    })

    worker.on("error", (error) => {
      console.error(`Worker error: ${error}`)
      reject(error)
    })

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`)
      }
    })
  })
}

// Kafka consumer (keeps listening)
const runConsumer = async () => {
  try {
    const consumer = kafka.consumer({ groupId: "main-group" })

    await consumer.connect()
    await consumer.subscribe({ topic: "first_topic", fromBeginning: false })

    runWorkerTask("runOnce").catch((error) => {
      console.error("Worker thread error:", error)
    })
    await consumer.run({
      eachMessage: async ({ message }) => {
        const messageValue = message.value?.toString()
        console.log(`Received Kafka message: ${messageValue}`)

        // Ensure we don't trigger an infinite loop
      }
    })
  } catch (err) {
    console.error("Error creating consumer:", err)
  }
}

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down...")
  try {
    await kafka.consumer({ groupId: "main-group" }).disconnect()
    console.log("Kafka consumer disconnected.")
  } catch (error) {
    console.error("Error during shutdown:", error)
  }
  process.exit(0)
}

// Listen for termination signals
process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

runConsumer()
