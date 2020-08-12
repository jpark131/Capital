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

//put to regular or specific id?
router.put("/:id", auth, async(req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) res.status(404).send('The transaction could not be found');

  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

    transaction.date = req.body.date;
    transaction.amount = req.body.amount;
    transaction.category = req.body.category;
    transaction.business = req.body.business;

  res.send(transaction);
});

module.exports = router;