const express = require("express");

const app = express();
const PORT = 3000;

const VERIFY_TOKEN = "etechsolutionwebhook18";

// Middleware to parse JSON
app.use(express.json());

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully ✅");
    res.status(200).send(challenge);
  } else {
    console.log("Webhook verification failed - Invalid token");
    res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  console.log("Webhook event received:");
  console.log(JSON.stringify(req.body, null, 2));

  // You can process your events here (messages, statuses, etc.)

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook server is running on http://localhost:${PORT}`);
});
