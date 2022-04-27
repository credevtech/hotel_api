const express = require("express");
const router = express.Router();
const db = require("../services/login.db");
const jwt = require("jsonwebtoken");

const getTocken = require('../controllers/auth.controller');

router.post("/auth", async (req, res) => {
  try {
    const token =  getTocken(0, "l0g1Ns3Cr3T2OnT7H3g0R3Ad9");
    res.send({ token });
  } catch (err) {
    res.sendStatus(500);
  }
 
});


module.exports = router;
