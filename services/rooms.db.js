const pool = require("../db.config");
const { addDate, compareDates } = require("../fx");
let db = {};
//get all rooms
db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM rooms`, (err, results) => {
      if (err) {
        return err;
      }
      return resolve(results);
    });
  });
};
db.allTypes = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM room_types`, (err, results) => {
      if (err) {
        return err;
      }
      return resolve(results);
    });
  });
};
db.getKey = room => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT lock_code FROM rooms WHERE room = ?`,
      [room],
      (err, results) => {
        if (err) {
          return err;
        }
        return resolve(results[0]);
      }
    );
  });
};
// add room
db.add = ({ room_name, room_type, price, lock_code }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO rooms(room ,room_type,lock_code,price,status  ) VALUES (? ,? , ? ,? , ? )`,
      [room_name, room_type, lock_code, price, "free"],
      (err, results) => {
        if (err) {
          console.log(err);
          return err;
        }
        return resolve({ status: 200 });
      }
    );
  });
};
db.addRoomType = ({ room_type, price }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO room_types(room_type ,price) VALUES (? ,?)`,
      [room_type, price],
      (err, results) => {
        if (err) {
          console.log(err);
          return err;
        }
        return resolve({ status: 200 });
      }
    );
  });
};
// occupy room
db.occupy = ({ room, client_id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE rooms SET status = "booked", bookee = ? WHERE room = ?',
      [client_id, room],
      (err, results) => {
        if (err) {
          return err;
        }
        return resolve({ status: 200 });
      }
    );
  });
};
// Free room
db.free = ({ idnumber }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE rooms SET status = "free" , bookee = ? , lock_status = "change" WHERE bookee = ?',
      [null, idnumber],
      (err, results) => {
        if (err) {
          return err;
        }
        if (results.affectedRows > 0) return resolve({ status: 200 });
        if (results.affectedRows === 0) return resolve({ status: 404 });
      }
    );
  });
};
//checkReservation
db.checkReservation = ({ room, reserveDate, period }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT  period , date FROM bookings WHERE room = ?`,
      [room],
      (err, results) => {
        let r = [];
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
              let reservation = results[i];
              r.push(
                compareDates(
                  reservation.date,
                  addDate(reservation.date, reservation.period),
                  new Date(reserveDate),
                  addDate(new Date(reserveDate), period)
                )
              );
              resolve(r);
            }
          } else {
            resolve([false]);
          }
        }
      }
    );
  });
};
// change room door key
db.changeKey = ({ lock_code, room_select }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE rooms SET lock_code = ?, lock_status = "changed" WHERE room = ?`,
      [lock_code, room_select],
      (err, results) => {
        if (err) {
          return err;
        }
        if (results.affectedRows > 0) return resolve({ status: 200 });
        if (results.affectedRows === 0) return resolve({ status: 404 });
      }
    );
  });
};
// Delete Room
db.delete = id => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM rooms WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return err;
      }
      if (results.affectedRows === 1) {
        return resolve({ msg: "success" });
      }
    });
  });
};

module.exports = db;
