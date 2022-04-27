const express = require("express");
const router = express.Router();
const db = require("../services/clients.db");

// get all clients 

router.get("/clients", async (req, res) => {
  try {
    let results = await db.all();

    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});
// get client by product id
router.get("/client/:id", async (req, res) => {
 
  try {
    let results = await db.one(req.params.id);

    res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.get("/client/details/:id", async (req, res) => {
 
  try {
    let results = await db.clientDetails(req.params.id);
    res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//get booked clients 
router.get("/clients/booked", async (req, res) => {
  try {
    let results = await db.in();
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// add new client
router.post("/client/add", async (req, res) => {
  try {
    let results = await db.add(req.body);
    res.json(results)
    res.sendStatus(200);

  } catch (e) {
    
    res.sendStatus(500);
  }
});

// remove client

router.post("/clients/delete", async (req, res) => {
  try {
    console.log(req)
    let results = await db.delete(req.body.id);
    res.json(results);
  } catch (e) {
    
    res.sendStatus(500);
  }
});
// checkout client
router.post("/client/checkOut", async (req, res) => {
   
  try {
   ;
    res.json(await db.checkOut(req.body));
  } catch (e) {
    
    res.sendStatus(500);
  }
});

module.exports = router;
