const express = require("express");
const winston = require("winston");
const app = express();

app.use(express.static("./"));

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
