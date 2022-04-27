const express = require("express");
const router = express.Router();
const db = require("../services/bookings.db");

//get all bookings

router.get("/bookings", async (req, res) => {
  try {
    let results = await db.all();

    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
//get booking by booking id
router.get("/booking", async (req, res) => {
  try {
    let results = await db.booking(req.body);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
// Edit  booking
router.post("/bookings/edit", async (req, res) => {
  try {
    let results = await db.editBooking(req.body);

    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//get bookings by client
router.get("/booking/:id", async (req, res) => {
  try {
    let results = await db.clientBookings(req.params.id);

    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
// add booking
router.post("/bookings/add", async (req, res) => {
  try {
    console.log(req.body);
    let results = await db.add(req.body);
  
    res.json(results);
  } catch (e) {
    console.log(e);

    res.sendStatus(500);
  }
});
// Delete booking
router.post("/bookings/delete", async (req, res) => {
  try {
    let results = await db.delete(req.body.id);
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});

// ================================================================================================
// Inderect bookings
// =====================================================================================

// adding booking
router.post("/bookings/indirect/add", async (req, res) => {
  try {
    let results = await db.indirectAdd(req.body);
    res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/bookings/order/get", async (req, res) => {
  try {
    let results = await db.getOrder();
    res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/bookings/order/:order", async (req, res) => {
  try {
    let results = await db.order(req.params.order);
    res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.get("/bookings/orders", async (req, res) => {
  try {
    let results = await db.orders();
    res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/bookings/sms", async (req, res) => {
  try {
    let results = await db.sendSms(req.body.phone, req.body.message);
    res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
module.exports = router;
