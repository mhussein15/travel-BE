const express = require("express");
const {
  airportList,
  airportCreate,
} = require("../controllers/airportController");
const passport = require("passport");
const { isAirline } = require("../middleware/isAirline");

// const { Airport } = require("../db/models");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAirline,
  airportList
);
router.post("/", airportCreate);

module.exports = router;
