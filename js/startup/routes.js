const express = require("express");
const users = require("../routes/users");
const login = require("../routes/login");
const transaction = require("../routes/transactions");

module.exports = function (app) {
  app.use(express.json());
  app.use("/users", users);
  app.use("/log-in", login);
  app.use("/transactions", transaction);
};
