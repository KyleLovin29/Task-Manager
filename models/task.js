const mongoose = require("mongoose");
const Joi = require("joi");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    Title: String,
    Task: String,
    AdditionalInfo: String,
    Category: String,
    Tags: [String],
    Severity: Number,
    Completed: Boolean,
  })
);

function validateTask(task) {
  const JoiSchema = Joi.object({
    task: Joi.string().min(2).required(),
  });
  return JoiSchema.validate(task);
}

exports.Task = Task;
exports.validate = validateTask;
