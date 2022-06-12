const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

router.get("/get/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    res.send(registeredUser);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  (req, res) => {
    res.status(200).json({
      msg: "successfully logged in",
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) return next(error);
    res.json({
      msg: "Logout!",
    });
  });
});

module.exports = router;
