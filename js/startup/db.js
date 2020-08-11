const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  const db =
    "dmongodb+srv://capitalUser:12345@capital.q4dxd.azure.mongodb.net/capital?retryWrites=true&w=majority";
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info(`Connected to ${db}...`));
};
