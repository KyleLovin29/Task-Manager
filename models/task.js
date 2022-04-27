const mongoose = require("mongoose");
const Joi = require("joi");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    Title: {
      type: String,
      required: true,
    },
    Task: {
      type: String,
      maxlength: 25,
      required: true,
    },
    AdditionalInfo: {
      type: String,
      maxlength: 250,
      required: false,
    },
    Category: {
      type: String,
      minlength: 3,
      required: true,
    },
    Tags: {
      type: Array,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "A task should have at least one tag.",
      },
      required: true,
    },
    Severity: {
      type: String,
      enum: ["Normal", "Important", "Very Important"],
      required: false,
    },
    Completed: {
      type: Boolean,
      default: false,
    },
    Hidden: Boolean,
  })
);

function validateTask(task) {
  const schema = Joi.object({
    Title: Joi.string().required(),
    Task: Joi.string().max(25).required(),
    AdditionalInfo: Joi.string().max(250),
    Category: Joi.string().min(3).required(),
    Tags: Joi.array().required(),
    Severity: Joi.string(),
    Completed: Joi.boolean(),
  });
  return schema.validate(task);
}

exports.Task = Task;
exports.validate = validateTask;
