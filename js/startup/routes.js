const express = require("express");
const static = require("../routes/static");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", static);
};
