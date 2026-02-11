const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "consumer-app",
  brokers: ["kafka:9092"], // Docker Compose Kafka broker
});

const consumer = kafka.consumer({ groupId: "test-group" });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
}

runConsumer().catch(console.error);
