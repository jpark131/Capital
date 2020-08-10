const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

console.log(
  jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwYTk4OTgwOWY1YTI1ZTAxYzI0MTAiLCJpYXQiOjE1OTcwMjQ2NTB9.HetbeqGRpzkMFY8awmdIaXLprCKL_WhCti7pOpRh7xg",
    config.get("jwtPrivateKey")
  )
);
