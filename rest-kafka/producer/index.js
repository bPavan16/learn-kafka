import express from "express";
import { connectProducer, sendMessage } from "./producer.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post("/produce", async (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message required" });
  }

  try {
    await sendMessage(topic, message);
    res.json({
      status: "Message sent",
      topic,
      message,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function start() {
  await connectProducer();
  app.listen(PORT, () => {
    console.log(`Producer running on port ${PORT}`);
  });
}

start();
