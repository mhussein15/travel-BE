const express = require("express");
const passport = require("passport");
const { flightList } = require("../controllers/flightController");
const router = express.Router();

//list flight
router.get("/", flightList);

module.exports = router;
