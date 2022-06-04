const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connecting to DB
const DB_URL = process.env.DB_URL
  ? process.env.DB_URL
  : "mongodb://localhost:27017/schedule-backend-nodejs";

mongoose.connect(DB_URL).catch((error) => {
  console.error(error);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Database connected!"));

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT ? process.env.PORT : 5300;
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
