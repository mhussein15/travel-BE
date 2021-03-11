const express = require("express");
const passport = require("passport");
const { flightList,flightSearch } = require("../controllers/flightController");
const router = express.Router();

//list flight
router.get("/", flightList);
router.get("/search", flightSearch);

module.exports = router;
