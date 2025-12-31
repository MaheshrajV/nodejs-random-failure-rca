# 🧪 Simulated Production Incident & Root Cause Analysis (RCA)

This project demonstrates how to simulate, debug, and resolve a production-like
incident in a Node.js Express application. The goal is to practice real-world
DevOps/SRE workflows such as log collection, debugging, reproducing issues, and
documenting a Root Cause Analysis (RCA).

---

## 🎯 Objectives

- Build a simple Node.js web application  
- Introduce a random failure (simulated bug)  
- Capture and analyze logs  
- Reproduce the issue  
- Identify the root cause  
- Propose and implement a fix  
- Verify stability  

This exercise helps simulate incident handling similar to real production
systems.

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **Linux/macOS Terminal / Shell**
- **Browser (for testing)**

---

## 📂 Project Setup

### 1️⃣ Install Dependencies
```bash
npm install

▶️ Running the Application (Buggy Version — Simulation)

Initially, the app contained code that randomly returned HTTP 500 errors to
simulate instability.

Run the app:

node server.js

Open in browser:

http://localhost:5000

🧾 Log Collection (Production Style)

Logs were captured using:

node server.js 2>&1 | tee app.log

This:

    Displays logs in terminal

    Saves logs to app.log file

❗ Simulated Issue

When refreshing the page multiple times:

    Sometimes the request succeeded

    Sometimes it failed with:

500 Internal Server Error

Log messages confirmed random failure injection.
🔍 Root Cause — Technical Explanation

The following code intentionally caused random errors:

const random = Math.random();

if (random < 0.3) {
  return res.status(500).send("Internal Server Error — Something broke!");
}

Meaning:

    Math.random() generates a number between 0–1

    If value < 0.3 → force a 500 error

    This results in ~30% failure rate

This was by design to simulate a flaky production API.
🛠 Fix Implemented

The random failure logic was removed to stabilize the service.
✅ Final Working Code

const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  console.log("Request received at:", new Date().toISOString());
  res.send("Application is running fine 👍");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

🚨 Additional Issue Found — 404 Not Found

At one point, the browser displayed:

404 Not Found

This happened because another application was already running on port 5000, so
requests were routed to the wrong service.
✔ Resolution

Either:

    Stop the conflicting process
    or

    Change port to 8080 (as done above)

🟢 Final Result

After applying the fix:

✔ No random errors
✔ No 404 issues
✔ API stable
✔ Requests logged successfully

Output example:

Application is running fine 👍

📄 Root Cause Analysis (RCA)
🧾 Incident Summary
Field	Details
Application	Node.js Express API
Incident Type	Intermittent HTTP 500 & 404 Errors
Impact	Unstable user experience
Severity	Medium
Status	Resolved
🎯 Root Causes
1️⃣ Random error injection in code

if (Math.random() < 0.3)

forced 30% request failures.
2️⃣ Port conflict

Another service was already running on port 5000, causing wrong routing.
🔁 Reproduction Steps

    Start app

    Refresh multiple times

    Capture logs

    Observe intermittent failures

🛠 Corrective Actions

✔ Removed random failure logic
✔ Ensured app used an available port
✔ Restarted and verified behavior
✅ Preventive Recommendations

    Avoid random behavior in prod code

    Monitor port usage

    Implement structured logging

    Add health checks & monitoring

    Use environment configs

📌 Learning Outcomes

    Debugging real-world-like incidents

    Log-based troubleshooting

    Reproducing unpredictable bugs

    RCA documentation

    Understanding port conflicts

    Express.js API basics
