const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { isLoggedIn } = require("../middleware/auth");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// TODO: destructure req.body.task and then pass the values
router.post("/create", isLoggedIn, async (req, res) => {
  try {
    const task = new Task(req.body.task);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.get("/get/:id", isLoggedIn, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.put("/edit/:id", isLoggedIn, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { ...req.body.task });
    res.json(task);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.delete("/delete/:id", isLoggedIn, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "task deleted successfully" });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

module.exports = router;
