const express = require("express");
const router = express.Router();
const db = require("../services/login.db");
const jwt = require("jsonwebtoken");
const key = require("../auth.config").loginSecret;
const session = require("express-session");


// add room
router.post("/login", async (req, res) => {
    try {
      let results = await db.login(req.body);
      console.log(results);
      // if (results.data.status) {
      //   console.log("Done");
      // }
      res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});
router.post("/checkEmail", async (req, res) => {
  try {
    let results = await db.checkEmail(req.body);
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
