import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"]
})

const producer = kafka.producer()

const runProducer = async () => {
  try {
    await producer.connect()

    const deliveryReports = await producer.send({
      topic: "first_topic",
      messages: [{ value: "hello from nodejs" }]
    })

    console.log("Message sent successfully:", deliveryReports)
  } catch (error) {
    console.error("Error producing message:", error)
  } finally {
    await producer.disconnect()
  }
}
const runConsumer = async () => {
  try {
    const consumer = kafka.consumer({
      groupId: "my-group"
    })
    await consumer.connect()
    await consumer.subscribe({ topic: "first_topic", fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(
          `Received message: ${message.value!.toString()}  | AT: ${message.timestamp} | Attributes: ${message.attributes} | Key: ${message.key} |`
        )
      }
    })
  } catch (err) {
    console.error("Error creating consumer:", err)
  }
}

runProducer()
// runConsumer()
