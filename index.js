const express = require("express");
const winston = require("winston");
const path = require("path");
const app = express();

app.use(express.static("./"));

require("./js/startup/logging")();
require("./js/startup/cors")(app);
require("./js/startup/routes")(app);
require("./js/startup/db")();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
