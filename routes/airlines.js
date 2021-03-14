const express = require("express");
const passport = require("passport");
const {
  fetchAirline,
  flightCreate,
  airlineList,
  airlineDetail,
} = require("../controllers/airlinesController");
const { isAirline } = require("../middleware/auth/isAuth");
const router = express.Router();


//FETCH AIRLINE FLIGHTS
router.get(
  "/flights",
  passport.authenticate("jwt", { session: false }),
  airlineList
);

//CREATES FLIGHT OF AIRLINE
router.post(
  "/flights/add",
  passport.authenticate("jwt", { session: false }),
  isAirline,
  flightCreate
);

module.exports = router;
