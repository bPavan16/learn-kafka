import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "consumer-app",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "multi-topic-group" });

const messages = [];
const notices = [];

async function startConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topics: ["message-topic", "notice-topic"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();

      const payload = {
        value,
        topic,
        partition,
        timestamp: new Date().toISOString(),
      };

      console.log(`Received message on topic "${topic}":`, payload);

      if (topic === "message-topic") {
        messages.push(payload);
        console.log("Stored message:", payload);
      }

      if (topic === "notice-topic") {
        notices.push(payload);
        console.log("Stored notice:", payload);
      }
    },
  });

  console.log("Consumer started successfully");
}

export { startConsumer, messages, notices };
