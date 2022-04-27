const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "credgawp_hotel_system",
  password: "",
  database: "hostel_system",
});

module.exports = pool;
