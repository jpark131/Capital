const express = require("express");
const winston = require("winston");
const users = require('./js/routes/users');
const app = express();

app.use(express.static("./"));
app.use('js/routes/users', users)

require('./js/startup/routes')(app);
require('./js/startup/db')();

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
