import kafka from "./client.js";

async function init() {
  const admin = kafka.admin();

  console.log("Admin Connecting...");

  await admin.connect(); // <-- Added await

  console.log("Admin Connected!");

  console.log("Creating topic...");

  await admin.createTopics({
    topics: [
      {
        topic: "zeliot-topic",
        numPartitions: 2,
      },
    ],
  });

  console.log("Topic created! [zeliot-topic]");

  await admin.disconnect();

  console.log("Admin Disconnected!");
}

init();