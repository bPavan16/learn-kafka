const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer-app',
  brokers: ['kafka:9092'] // Docker Compose Kafka broker
});

const producer = kafka.producer();

async function sendMessage(topic, message) {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
  await producer.disconnect();
}

module.exports = { sendMessage };
