import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "producer-app",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log("Producer connected");
}

async function sendMessage(topic, message) {
console.log(`Sending message to topic "${topic}": ${message}`);
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
}

export { connectProducer, sendMessage };
