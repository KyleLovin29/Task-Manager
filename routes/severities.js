const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Severity, validate } = require("../models/severity");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const severities = await Severity.find().select("-__v").sort("name");
  res.send(severities);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(eror.details[0].message);

  let severity = new Severity({ name: req.body.name });
  severity = await severity.save();

  res.send(severity);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const severity = await Severity.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });

  if (!severity)
    return res
      .status(404)
      .send("The severity with the given ID was not found.");

  res.send(severity);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const severity = await Severity.findByIdAndRemove(req.params.id);

  if (!severity)
    return res
      .status(404)
      .send("The severity with the given ID was not found.");

  res.send(severity);
});

module.exports = router;
