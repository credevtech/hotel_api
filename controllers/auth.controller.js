const jwt = require("jsonwebtoken");

const getToken = (id ,secret) => {
 const token = jwt.sign(
    {
      id ,
    },
    secret,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  return token;
}
module.exports = getToken;
