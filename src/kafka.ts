import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"]
})

const producer = kafka.producer()

const run = async () => {
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

run()
