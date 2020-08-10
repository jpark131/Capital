const express = require("express");
const users = require("../routes/users");
const login = require("../routes/login");
const transaction = require("../routes/transactions");

module.exports = function (app) {
  app.use(express.json());
  app.use("/users", users);
  app.use("/login", login);
  app.use("/transaction", transaction);
};
