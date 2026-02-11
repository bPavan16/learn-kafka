import kafka from "./client.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const producer = kafka.producer();

async function sendMessage(message) {
  await producer.send({
    topic: "zeliot-topic",
    messages: [
      {
        key: "input",
        value: message,
      },
    ],
  });
  console.log("Message sent!");
}

async function main() {
  await producer.connect();

  function prompt() {
    rl.question("Enter a message to send to Kafka (Ctrl+C to exit): ", async (answer) => {
      try {
        await sendMessage(answer);
      } catch (err) {
        console.error("Error sending message:", err);
      }
      prompt(); // Ask again
    });
  }

  prompt();
}

main();

process.on("SIGINT", async () => {
  await producer.disconnect();
  rl.close();
  console.log("\nProducer disconnected. Exiting.");
  process.exit(0);
});