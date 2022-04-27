const express = require("express");
const router = express.Router();
const db = require("../services/rooms.db");

//get all rooms

router.get("/rooms", async (req, res) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/room/types", async (req, res) => {
  try {
    let results = await db.allTypes();
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/getKey/:room", async (req, res) => {
  try {
    let results = await db.getKey(req.params.room);
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});

// add room
router.post("/rooms/add", async (req, res) => {
  try {
    let results = await db.add(req.body);
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});

//add Room Type
router.post("/room/types/add", async (req, res) => {
  try {
    let results = await db.addRoomType(req.body);
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});
//occupy room
router.post("/room/occupy", async (req, res) => {
  try {
    (await db.occupy(req.body)) && res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

//Free room
router.post("/room/free", async (req, res) => {
  try {
    const results = await db.free(req.body);
    res.send(results);
  } catch (e) {
    res.sendStatus(500);
  }
});
//checkReservation
router.get(
  "/room/checkReservation/:room/:reserveDate/:period",
  async (req, res) => {
    try {
      const results = await db.checkReservation(req.params);
      res.send(results);
    } catch (e) {
      res.sendStatus(500);
    }
  }
);
//update room key
router.post("/room/changeKey", async (req, res) => {
  try {
    let results = await db.changeKey(req.body);
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});

//room delete

router.post("/rooms/delete", async (req, res) => {
  try {
    let results = await db.delete(req.body.id);
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
