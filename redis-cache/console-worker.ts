// Console Worker: Periodically update a Redis key with a random value
import { createClient } from 'redis';

const redisClient = createClient();
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

async function updateCache(key: string) {
  const value = `Random value: ${Math.floor(Math.random() * 1000)}`;
  await redisClient.setEx(key, 3600, value);
  console.log(`Cache updated for key: ${key} with value: ${value}`);
}

redisClient.connect().then(() => {
  console.log('Worker started. Updating Redis cache every 10 seconds.');
  setInterval(() => updateCache('demo'), 10000);
});
