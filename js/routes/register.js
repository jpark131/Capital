const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  // validates user by calling validate method.
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checks if user is already in the database by looking up email for
  // other registered users with the same email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user = await user.save();
  res.send(user);

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
});

module.exports = router;
