const { Task, validate } = require("../models/task");
const express = require("express");
const router = express.Router();

mongoose
  .connect("mongodb://localhost/task-manager")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

router.get("/", (req, res) => {
  async function getTasks() {
    const tasks = await Task.find();
    console.log(tasks);
  }
  getTasks();
});

router.get("/:id", (req, res) => {
  async function getTask(id) {
    const task = await Task.findById(id);
    console.log(task);
  }
  getTask(req.params.id);
});

router.post("/", (req, res) => {
  async function createTask() {
    const task = new Task({
      Title: "Lunch",
      Task: "Go the to store",
      AdditionalInfo: "Get bread",
      Category: "Food",
      Tags: ["sandwiches", "lunch"],
      Severity: 1,
      Completed: false,
    });

    const result = await task.save();
    console.log(result);
  }
  createTask();
});

router.put("/:id", (req, res) => {
  async function updateTask(id) {
    const task = await Task.findById(id);
    if (!task) return;

    task.Title = "Movie";
    task.Task = "Go to movies";
    task.AdditionalInfo = "";
    task.Category = "Entertainment";
    task.Tags = ["6:30"];
    task.Severity = 3;
    task.Completed = true;

    const result = await task.save();
    console.log(result);
  }
  updateTask(req.params.id);
});
router.delete("/:id", (req, res) => {
  async function deleteTask(id) {
    const result = await Task.deleteOne({ _id: id });
    if (!result) return;

    console.log(result);
  }
  deleteTask(req.params.id);
});

module.exports = router;
