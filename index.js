const express = require("express");

const app = express(); const DEFAULT_PORT = 3000; const VERIFY_TOKEN = "etechsolutionwebhook18";

// Middleware to parse JSON app.use(express.json());

// GET method for webhook verification app.get("/webhook", (req, res) => { // Support both plain and hub-prefixed param names: const mode = req.query.mode || req.query["hub.mode"]; const token = req.query.verify_token || req.query["hub.verify_token"]; const challenge = req.query.challenge || req.query["hub.challenge"];

if (mode === "subscribe" && token === VERIFY_TOKEN) { console.log("Webhook verified successfully ✅"); return res.status(200).send(challenge); } else { console.error("Webhook verification failed - Invalid mode or token"); return res.sendStatus(403); } });

// POST method to handle incoming webhook events app.post("/webhook", (req, res) => { console.log("Webhook event received:"); console.log(JSON.stringify(req.body, null, 2));

// TODO: add event processing logic here

// Respond with a success status quickly res.sendStatus(200); });

// Start the server const port = process.env.PORT || DEFAULT_PORT; const host = "0.0.0.0"; app.listen(port, host, () => { console.log(🚀 Webhook server is running on http://${host}:${port}); });
