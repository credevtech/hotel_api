const express = require("express");
const jwt = require("jsonwebtoken");

const authjwt = require("./authJwt").verifyToken;

module.exports = {
  checkToken: authjwt,
};
