// Console Consumer: Read a value from Redis cache
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
function askAndGet() {
    rl.question('Enter key to get: ', async (key) => {
        const value = await redisClient.get(key);
        if (value !== null) {
            console.log(`Value for key "${key}": ${value}`);
        }
        else {
            console.log(`Key "${key}" not found in Redis.`);
        }
        askAndGet();
    });
}
redisClient.connect().then(() => {
    console.log('Connected to Redis.');
    askAndGet();
});
//# sourceMappingURL=console-consumer.js.map