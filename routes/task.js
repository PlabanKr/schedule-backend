const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ tasks: ["math", "chem"] });
});

router.get("/:id", (req, res) => {
  res.send(`Sending task with a`);
});

router.post("/create", (req, res) => {
  res.send("Task was created");
});

module.exports = router;
