const express = require("express");
const passport = require("passport");
const { flightCreate, flightList } = require("../controllers/flightController");
const router = express.Router();

//create flight
router.get("/", flightList);
//create flight
router.post("/", flightCreate);

module.exports = router;
