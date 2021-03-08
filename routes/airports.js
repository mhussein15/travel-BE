const express = require("express");
const {
  airportList,
  airportCreate,
} = require("../controllers/airportController");
// const { Airport } = require("../db/models");

const router = express.Router();

router.get("/", airportList), router.post("/", airportCreate);

module.exports = router;
