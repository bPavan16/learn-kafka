import express from "express";
import { startConsumer, messages, notices } from "./consumer.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "Consumer service running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/messages", (req, res) => {
  res.json({
    count: messages.length,
    data: messages,
  });
});

app.get("/notices", (req, res) => {
  res.json({
    count: notices.length,
    data: notices,
  });
});

async function start() {
  try {
    await startConsumer();

    app.listen(PORT, () => {
      console.log(`Consumer API running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start consumer:", err);
    process.exit(1);
  }
}

start();
