const express = require("express");
const app = express();
const port = 5000;

// Stable API (no random failures)
app.get("/", (req, res) => {
  console.log("Request received at:", new Date().toISOString());
  res.send("Application is running fine 👍");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
