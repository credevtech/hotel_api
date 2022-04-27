const pool = require("../db.config");
let db = {};
//get all bookings
db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM bookings ORDER BY date DESC`, (err, results) => {
      if (err) {
        return err;
      }
      return resolve(results);
    });
  });
};

db.getOrder = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM indirect_bookings`, (err, results) => {
      if (err) {
        return err;
      }
      return resolve({ order: `OCH${results.length + 1}` });
    });
  });
};

//get booking by booking id
db.booking = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM bookings WHERE client_id=?`,
      [id],
      (err, results) => {
        if (err) {
          return err;
        }
        return resolve(results);
      }
    );
  });
};
//get booking by client id
db.clientBookings = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM bookings WHERE client_id=?`,
      [id],
      (err, results) => {
        if (err) {
          return err;
        }
        return resolve(results);
      }
    );
  });
};
//Update Bookings

db.editBooking = data => {
  const {
    client_id,
    room,
    period,
    payment_method,
    amount,
    type,
    reservedDate,
    id
  } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE 'bookings' SET 'client_name'= ?,'client_id'= ?,'room'= ?,'period' = ? ,'payment_method'= ?,'amount'= ?,'type'=?,'reservedDate'= ? WHERE 'id' = ? `,
      [client_id, room, period, payment_method, amount, type, reservedDate, id],
      (err, results) => {
        if (err) {
          console.log("Error", err);

          return err;
        }
        return resolve(results);
      }
    );
  });
};

// add booking
db.add = ({
  client_name,
  client_id,
  room,
  period,
  meals,
  payment_method,
  amount,
  type,
  reservedDate,
  adults,
  children
}) => {

  if (!client_name || !client_id || !room || !period || !meals || !payment_method || !amount || !type || !adults || !children) {
    return Promise.resolve({ error: true, message: "Please fill out all fields" });
  }

  sql = `INSERT INTO bookings(client_name, client_id ,room ,adults, children,period,meals,payment_method ,amount ,type ${type ===
  "reservation"
    ? " ,reservedDate"
    : ""} ) VALUES (? , ? , ? ,? ,?,?,?,?,?,? ${type === "reservation"
    ? " ,?"
    : ""}) `;
  return new Promise((resolve, reject) => {
    pool.query(
      `${sql}`,
      [
        client_name,
        client_id,
        room,
        adults,
        children,
        period,
        meals,
        payment_method,
        amount,
        type,
        reservedDate
      ],
      (err, results) => {
        if (err) {
          reject(err);
        }

        return resolve({ status: 200 });
      }
    );
  });
};
// Delete Booking
db.delete = id => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM bookings WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return err;
      }
      if (results.affectedRows === 1) {
        return resolve({ msg: "success" });
      }
    });
  });
};
// ================================================================================================
// indirect AddBooking
// ================================================================================================
db.indirectAdd = ({
  idnumber,
  orderNumber,
  room_type,
  meals,
  adults,
  period,
  children,
  reserveDate,
  amount
}) => {
  sql = `INSERT INTO indirect_bookings(client_id , order_number , room_type ,meals, adults,period,children ,reserveDate , amount ) VALUES (? ,?, ?, ?, ? ,? ,?,?,?) `;
  return new Promise((resolve, reject) => {
    pool.query(
      `${sql}`,
      [
        idnumber,
        orderNumber,
        room_type,
        meals,
        adults,
        period,
        children,
        reserveDate,
        amount
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (results.affectedRows === 1)
            return resolve({ status: 200, order: orderNumber });
        }
      }
    );
  });
};
//order by id
db.order = order => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM indirect_bookings WHERE order_number = ?`,
      [order],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.orders = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM indirect_bookings`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
// ======================================================================
//                    Send send Sms
// ======================================================================
db.sendSms = (number, message) => {
  var https = require("follow-redirects").https;
  var fs = require("fs");

  var options = {
    method: "POST",
    hostname: "l1mvw.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization:
        "49e4f6b0106bf0f671e15257f351a45d-6135b735-ef42-4209-a2be-40266bdf79a2",
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    maxRedirects: 20
  };
  try {
    var req = https.request(options, function(res) {
      var chunks = [];
      res.on("error", function(error) {
        console.error(error);
      });
      res.on("data", function(chunk) {
        chunks.push(chunk);
      });

      res.on("end", function(chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    var postData = JSON.stringify({
      messages: [
        {
          from: "ChivhuHotel",
          destinations: [{ to: number }],
          text: message
        }
      ]
    });

    req.write(postData);
    req.end();
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = db;
