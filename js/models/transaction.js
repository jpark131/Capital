const Joi = require("joi");
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  business: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

function validateTransaction(transaction) {
  const schema = {
    category: Joi.string().min(5).max(20).required(),
    amount: Joi.number().min(0).required(),
    date: Joi.date(),
    business: Joi.string().min(5).max(20).required(),
  };

  return Joi.validate(transaction, schema);
}

exports.transactionSchema = transactionSchema;
exports.Transaction = Transaction;
exports.validate = validateTransaction;
