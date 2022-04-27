const pool = require("../db.config");
let db = {};
// get all Users
db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users`,
      (err, results) => {
        if (err) {
          return err;
        }
        return resolve(results);
      }
    );
  });
};
// get user by username
db.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM clients WHERE username = ?`,
      [id],
      (err, results) => {
        if (err) {
          return err;
        }
        if (results) {
          if (results.length !== 0) {
            resolve({ found: results });
          }
          resolve({ found: false });
        }
      }
    );
  });
};

// get active users 
db.active = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM clients WHERE status ='active'`,
      (err, results) => {
        if (err) {
          return err;
        }

        return resolve(results);
      }
    );
  });
};

// add user
db.add = (props) => {
    const { name, email, password, cellnumber, role } = props;
    const username = name.replace(/\s/g, '');

  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO users(name, username,cell_number, email, password , role
         ) VALUES (?, ? ,?, ? ,? , ? ) `,
      [name,username,cellnumber,email, password, role ],
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

// Delete User
db.delete = (id) => {
  
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM users WHERE id = ?`,
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
