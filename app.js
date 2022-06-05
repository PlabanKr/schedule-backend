const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

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

// middlewares
app.use(bodyParser.json());
app.use(cors());

// All the routes

const tasksRoutes = require("./routes/task");

app.use("/tasks", tasksRoutes);

const PORT = process.env.PORT ? process.env.PORT : 5300;
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
