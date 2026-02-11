import kafka from "./client.js";

async function init() {
  const consumer = kafka.consumer({ groupId: "user-1" });

  console.log("Consumer Connecting...");
  
  await consumer.connect();

  await consumer.subscribe({ topic: "zeliot-topic", fromBeginning: true });

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

  console.log("Consumer Connected!");
}

init();