const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const { isLoggedIn } = require("../middleware/auth");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// TODO: destructure req.body.project and then pass the values
router.post("/create", isLoggedIn, async (req, res) => {
  try {
    const project = new Project(req.body.project);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.get("/get/:id", isLoggedIn, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.put("/edit/:id", isLoggedIn, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, {
      ...req.body.project,
    });
    res.json(project);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.delete("/delete/:id", isLoggedIn, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

module.exports = router;
