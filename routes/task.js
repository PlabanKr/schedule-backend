const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
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

router.get("/get/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { ...req.body.task });
    res.json(task);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
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
