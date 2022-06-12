const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const User = require("./models/user");

const app = express();

// app global variable
const PORT = process.env.PORT ? process.env.PORT : 5300;
const DB_URL = process.env.DB_URL
  ? process.env.DB_URL
  : "mongodb://localhost:27017/schedule-backend-nodejs";
const SESSION_SECRET = process.env.SESSION_SECRET
  ? process.env.SESSION_SECRET
  : "thisshouldnotbehere";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN
  : "http://localhost:3000";

// Connecting to DB

mongoose.connect(DB_URL).catch((error) => {
  console.error(error);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Database connected!"));

// middlewares

app.use(bodyParser.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(SESSION_SECRET));
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

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
