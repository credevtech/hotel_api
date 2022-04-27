const pool = require("../db.config");
let db = {};
// get all cllents
db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM clients`,
      (err, results) => {
        if (err) {
          return err;
        }
        return resolve(results);
      }
    );
  });
};
// get client by client id
db.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM clients WHERE client_id = ?`,
      [id],
      (err, results) => {
        if (err) {
          return err;
        }
        if (results) {
          if (results.length !== 0) {
            resolve({ found: results });
          } else {
            resolve({ found: results });
          }
          resolve({ found: false });
        }
      }
    );
  });
};
db.clientDetails = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT client_id, client_name, address, cell_number FROM clients WHERE client_id = ?`,
      [id],
      (err, results) => {
        if (err) {
          return err;
        }
        if (results) {
          if (results.length !== 0) {
            resolve({ found: results });
          } else {
            resolve({ found: results });
          }
          resolve({ found: false });
        }
      }
    );
  });
};

// get booked clients 
db.in = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM clients WHERE checked_in='true'`,
      (err, results) => {
        if (err) {
          return err;
        }

        return resolve(results);
      }
    );
  });
};

// add client
db.add = (props) => {

  const { idnumber, name, address, cellnumber, vehicle, email , gender, id_type , nationality } = props;
  let id = idnumber;
  let client_name = name;
  let cell = cellnumber;
  
  if (!idnumber || !name || !address || !cellnumber || !vehicle || !email || !gender || !id_type || !nationality) {
    return Promise.resolve({ error: true, message: "Please fill out all fields" });
  }

  return new Promise((resolve) => {
    pool.query(`INSERT INTO clients(client_id ,id_type, client_name,nationality, gender, address,cell_number , vehicle_reg
       ,email  ) VALUES (?, ? ,?, ? ,?, ?, ?, ?, ?  ) `,
      [id, id_type,  client_name,nationality, gender, address, cell, vehicle, email ],
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
// checkOut Client
db.checkOut = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE clients SET checked_in = 'false' WHERE client_id = ?`,
      [id],
      (err, results) => {
        if (err) {
          return err;
        }
        return resolve({ status: 200 });
      }
    );
  });
};
// Delete Client
db.delete = ( id ) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM clients WHERE id = ?`,
      [id],
      (err, results) => {
        if (err) {

          return err;


        }
        if (results.affectedRows === 1) {
          return resolve({ msg: 'success' });
          
        }
        
      }
    );
  });
};


module.exports = db;
