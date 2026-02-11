import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "console-producer",
  brokers: ["localhost:29092"],
});

const producer = kafka.producer();

async function runProducer(message) {
  await producer.connect();

  await producer.send({
    topic: "simple-topic",
    messages: [{ value: message }],
  });

  await producer.disconnect();
}

const message = "Hello, Kafka!";

runProducer(message).catch((error) => {
  console.error("Error running producer:", error);
});
