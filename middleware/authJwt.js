const jwt = require("jsonwebtoken");
const config = require("../auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided"
    });
  }
  jwt.verify(token, config.loginSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorised!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;
