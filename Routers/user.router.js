const express = require("express");
const router = express.Router();

const User = require("../Models/user.model.js");

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User({
    ...req.body,
  });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
