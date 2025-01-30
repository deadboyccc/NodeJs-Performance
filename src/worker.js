const { Kafka } = require("kafkajs")
const { faker } = require("@faker-js/faker")

console.log("Worker is running!")

const kafka = new Kafka({
  clientId: "worker-thread",
  brokers: ["localhost:9092"]
})

const producer = kafka.producer()

const runProducer = async () => {
  try {
    await producer.connect()

    // Generate 50 messages - faker js sentence
    const messages = Array.from({ length: 1 }, () => ({
      value: faker.lorem.sentence()
    }))

    // Send all messages in bulk as an array of message
    await producer.send({
      topic: "first_topic",
      messages
    })

    console.log("Messages sent successfully!")
  } catch (error) {
    console.error("Error producing message:", error)
  } finally {
    await producer.disconnect()
  }
}

runProducer()
