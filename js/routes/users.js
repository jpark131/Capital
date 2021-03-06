const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate("transactions");
  res.send(user);
});

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
    transactions: req.body.transactions,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user = await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/me/password", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPass = await bcrypt.hash(req.body.password, salt);

  let user = await User.findByIdAndUpdate(
    req.user._id,
    { password: newPass },
    { new: true }
  );
  if (!user) res.status(404).send("The user could not be found");

  res.send(user);
});

router.put("/me", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user && user._id === req.user._id)
    return res.status(400).send("User already registered with that email.");

  user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      transactions: req.body.transactions,
      budget: req.body.budget,
    },
    {
      new: true,
    }
  );
  if (!user) res.status(404).send("The user could not be found");

  res.send(user);
});

module.exports = router;
