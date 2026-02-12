// Console Producer: Write a value to Redis cache
import { createClient } from 'redis';
import readline from 'readline';

const redisClient = createClient();
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askAndSet() {
  rl.question('Enter key: ', (key) => {

    rl.question('Enter value: ', async (value) => {
      await redisClient.SETNX(key, value);
      await redisClient.setEx(key, 3600, value);
      console.log(`Set key "${key}" with value "${value}" in Redis.`);
      askAndSet();
    });
  });
}

redisClient.connect().then(() => {
  console.log('Connected to Redis.');
  askAndSet();
});

