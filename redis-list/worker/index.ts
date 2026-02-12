import { createClient } from "redis";

const client = createClient();

async function processSubmission(submission: string) {
  try {
    const { name, address, email } = JSON.parse(submission);

    console.log("Received submission:", { name, address, email });

    console.log(`Processing submission for ${name}...`);
    console.log(`Address: ${address}`);
    console.log(`Email: ${email}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for ${name}.`);
  } catch (error) {
    console.error("Failed to process submission:", error);
  }
}

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");

    // Main loop
    while (true) {
      try {
        const submission = await client.brPop("user", 0);
        if (submission && submission.element) {
          await processSubmission(submission.element);
        } else {
          console.warn("No submission found or submission is malformed.");
        }
      } catch (error) {
        console.error("Error processing submission:", error);
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

startWorker();
