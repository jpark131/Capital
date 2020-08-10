const { Transaction, validate } = require("../models/transaction");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const transactions = await Transaction.find().sort("date");
  res.send(transactions);
});

router.get("/:id", auth, async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  res.send(transaction);
});

router.post("/", auth, async (req, res) => {
  // validates transaction by calling validate method.
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let transaction = new Transaction({
    date: req.body.date,
    amount: req.body.amount,
    category: req.body.category,
    business: req.body.business,
  });

  transaction = await transaction.save();
  res.send(transaction);
});

module.exports = router;
