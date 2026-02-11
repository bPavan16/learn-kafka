import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "console-consumer",
  brokers: ["localhost:29092"],
});

const consumer = kafka.consumer({ groupId: "console-consumer" });

const runConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "simple-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Received message:");
      console.log(message.value.toString());
    },
  });
};

runConsumer().catch((error) => {
  console.error("Error running consumer:", error);
});