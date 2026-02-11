const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

const kafka = new Kafka({
  clientId: 'producer-app',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

app.post('/produce', async (req, res) => {
  const { message } = req.body;
  try {
    await producer.connect();
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: message }],
    });
    await producer.disconnect();
    res.send('Message sent to Kafka');
  } catch (err) {
    res.status(500).send('Failed to send message');
  }
});

app.get('/', (req, res) => {
  res.send('Producer service is running');
});

app.listen(PORT, () => {
  console.log(`Producer service running on port ${PORT}`);
});
