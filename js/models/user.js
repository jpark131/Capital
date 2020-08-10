const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  categories: {
    type: [String],
    default: [],
  },
  transactions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
    default: [],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  months: [
    {
      type: new mongoose.Schema({
        name: String,
        year: Number,
        budget: this.budget,
        actual: Number,
      }),
      required: true,
      default: [],
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );

  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    transactions: Joi.array(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
