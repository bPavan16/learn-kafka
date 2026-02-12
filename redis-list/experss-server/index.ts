import express, { type Request, type Response } from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on("error", (err: Error) => console.error("Redis Client Error", err));

app.post("/submit", async (req: Request, res: Response) => {
  const { name, address, email } = req.body;

  if (!name || !address || !email) {
    return res
      .status(400)
      .json({ message: "Missing name, address, or email." });
  }

  console.log(`Received submission: ${name}, ${address}, ${email}`);

  try {
    await client.lPush("user", JSON.stringify({ name, address, email }));
    res.status(200).json({
      message: "Submission received and stored successfully.",
      data: { name, address, email },
    });
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).json({ message: "Failed to store submission." });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

startServer();
