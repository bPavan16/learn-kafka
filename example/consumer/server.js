const express = require("express");
const { Kafka } = require("kafkajs");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Store received messages in memory
let receivedMessages = [];

const kafka = new Kafka({
  clientId: "consumer-app",
  brokers: ["kafka:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageValue = message.value.toString();
      console.log(`Received message: ${messageValue}`);
      // Store message with timestamp
      receivedMessages.push({
        id: Date.now(),
        message: messageValue,
        timestamp: new Date().toISOString(),
        topic,
        partition,
      });
    },
  });
}

app.get("/messages", (req, res) => {
  res.json({
    total: receivedMessages.length,
    messages: receivedMessages,
  });
});

app.get("/", (req, res) => {
  res.send("Consumer service is running");
});

app.listen(PORT, () => {
  console.log(`Consumer service running on port ${PORT}`);
  startConsumer().catch(console.error);
});
