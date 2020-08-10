const express = require("express");
const winston = require("winston");
const app = express();

app.use(express.static("./"));

require("./js/startup/logging")();
require("./js/startup/cors")(app);
require("./js/startup/routes")(app);
require("./js/startup/db")();

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
