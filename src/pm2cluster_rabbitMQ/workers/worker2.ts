import amqplib from "amqplib"
const consumeWorkerTwo = async () => {
  const queue = "thread2"
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
}
consumeWorkerTwo()
