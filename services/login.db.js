const pool = require("../db.config");
let db = {};
//get all bookings
db.checkEmail = ({ email }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT email FROM users WHERE email = ?`,
      [email],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length > 0) {
          if (results[0].email === email)
            return resolve({ status: true, msg: "Email Found " });
        } else {
          return resolve({ status: false, msg: "Email not found " });
        }
      }
    );
  });
};
db.login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (results.length > 0) {
          if (results[0].password === password) {
            const key = require("../auth.config").loginSecret;
            const getTocken = require("../controllers/auth.controller");
            const token = getTocken(0, key);
            return resolve({
              token,
              status: true,
              email,
              role: results.role,
              msg: "Email Found ",
              info: {
                email: results[0].email,
                phone: results[0].cell_number,
                role: results[0].role,
                name: results[0].name
              }
            });
          } else {
            return resolve({ status: false, msg: "Wrong Password" });
          }
        } else {
          return resolve({ status: false, msg: "Email not found " });
        }
      }
    );
  });
};

module.exports = db;
