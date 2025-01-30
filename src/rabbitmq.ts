import { faker } from "@faker-js/faker"
import amqplib from "amqplib"
;(async () => {
  const queue = "tasks"
  const conn = await amqplib.connect("amqp://localhost")

  const ch1 = await conn.createChannel()
  await ch1.assertQueue(queue)

  // Listener
  ch1.consume(queue, (msg: any) => {
    if (msg !== null) {
      console.log("Received:", msg.content.toString())
      ch1.ack(msg)
    } else {
      console.log("Consumer cancelled by server")
    }
  })

  // Sender
  const ch2 = await conn.createChannel()

  setInterval(() => {
    ch2.sendToQueue(queue, Buffer.from(faker.lorem.words({ max: 5, min: 2 })))
  }, 1000)
})()
