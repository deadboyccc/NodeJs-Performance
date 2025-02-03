import amqplib from "amqplib"
import { fibonacciSeriesOptimized } from "../mathLogic/fib"
export const doWorkThreadOne = async (num: number) => {
  const result = fibonacciSeriesOptimized(num)
  const queue = "thread1"
  const conn = await amqplib.connect("amqp://localhost")

  const ch1 = await conn.createChannel()
  await ch1.assertQueue(queue)
  // Sender (thread1)
  const ch2 = await conn.createChannel()
  console.log(`${queue} did the work`)
  ch2.sendToQueue(queue, Buffer.from(result.toString()))
}
