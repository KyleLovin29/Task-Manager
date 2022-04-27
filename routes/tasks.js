const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const _ = require("lodash");
const { Task, validate } = require("../models/task");
const { User } = require("../models/user");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.get("/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID cannot be found");

  res.send(task);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({
    Title: req.body.Title,
    Task: req.body.Task,
    AdditionalInfo: req.body.AdditionalInfo,
    Category: req.body.Category,
    Tags: req.body.Tags,
    Severity: req.body.Severity,
    Completed: req.body.Completed,
    Hidden: req.body.Hidden,
  });

  task = await task.save();
  res.send(task);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const currentTask = await Task.findByIdAndUpdate(req.params.id, {
    Title: req.body.Title,
    Task: req.body.Task,
    AdditionalInfo: req.body.AdditionalInfo,
    Category: req.body.Category,
    Tags: req.body.Tags,
    Severity: req.body.Severity,
    Completed: req.body.Completed,
  });

  if (!currentTask)
    return res.status(404).send("The task with the given ID cannot be found");

  res.send(currentTask);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID cannot be found");

  res.send(task);
});

module.exports = router;
