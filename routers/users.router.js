const express = require("express");
const router = express.Router();
const db = require("../services/users.db");

// get all clients 
router.get("/users", async (req, res) => {
  try {
    let results = await db.all();

    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});
// get client by product id
router.get("/users/:id", async (req, res) => {
  console.log(req.params)
  try {
    let results = await db.one(req.params.id);

    res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//get booked clients 
router.get("/users/active", async (req, res) => {
  try {
    let results = await db.active();
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// add new client
router.post("/users/add", async (req, res) => {
  try {
      let results = await db.add(req.body);
      console.log(req.body ,results);
    res.sendStatus(200);

  } catch (e) {
    
    res.sendStatus(500);
  }
});

router.post("/users/delete", async (req, res) => {
  try {
    let results = await db.delete(req.body.id);

    res.json(results);

  } catch (e) {
    res.sendStatus(500);
  }
});
module.exports = router;
