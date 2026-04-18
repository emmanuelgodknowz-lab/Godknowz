const express = require("express");

const app = express();
const PORT = 3000;

const VERIFY_TOKEN = "etechsolutionwebhook18";

// Middleware to parse JSON
app.use(express.json());

// GET method for webhook verification
app.get("/webhook", (req, res) => {
  const { mode, verify_token, challenge } = req.query;

  // Check if the mode and token are provided correctly
  if (mode === "subscribe" && verify_token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully ✅");
    return res.status(200).send(challenge);
  } else {
    console.error("Webhook verification failed - Invalid mode or token");
    return res.sendStatus(403);
  }
});

// POST method to handle incoming webhook events
app.post("/webhook", (req, res) => {
  console.log("Webhook event received:");
  console.log(JSON.stringify(req.body, null, 2));

  // Add your event processing logic here

  // Respond with a success status
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Webhook server is running on http://localhost:${PORT}`);
});
