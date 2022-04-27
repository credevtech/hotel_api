const express = require("express");
const router = express.Router();

//Home router
router.get("/", (req, res) => {
  res.json({ msg: "Chivhu Hotel Online System API" });
});

module.exports = router;
