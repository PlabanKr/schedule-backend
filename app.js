const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const User = require("./models/user");

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
const SESSION_SECRET = process.env.SESSION_SECRET
  ? process.env.SESSION_SECRET
  : "thisshouldnotbehere";

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// All the routes

const tasksRoutes = require("./routes/task");
const projectsRoutes = require("./routes/project");
const userRoutes = require("./routes/user");

app.use("/tasks", tasksRoutes);
app.use("/projects", projectsRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT ? process.env.PORT : 5300;
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
