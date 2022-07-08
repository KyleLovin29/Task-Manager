const Joi = require("joi");
const mongoose = require("mongoose");

const severitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 30,
  },
});

const Severity = mongoose.model("Severity", severitySchema);

function validateSeverity(severity) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
  });

  return schema.validate(severity);
}

exports.severitySchema = severitySchema;
exports.Severity = Severity;
exports.validate = validateSeverity;
