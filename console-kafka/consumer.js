import kafka from "./client.js";

async function init() {
  const consumer = kafka.consumer({ groupId: "user-1" });

  console.log("Consumer Connecting...");

  // Connect to the Kafka cluster
  await consumer.connect();

  // Subscribe to the topic "zeliot-topic" and read messages from the beginning of the topic
  await consumer.subscribe({ topic: "zeliot-topic", fromBeginning: true });

  // Consume messages from the topic and log them to the console
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        key: message.key ? message.key.toString() : null,
        value: message.value ? message.value.toString() : null,
      });
    },
  });

  // This is a comment this says nothing imp but this comment exists so that my code looks cool :D
  console.log("Consumer Connected!");
}

// run the consumer
init();
