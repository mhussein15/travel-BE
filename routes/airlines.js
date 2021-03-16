const express = require("express");
const passport = require("passport");
const {
  fetchAirline,
  flightCreate,
  airlineList,
  airlineDetail,
  flightEdit,
} = require("../controllers/airlinesController");
const { isAirline } = require("../middleware/auth/isAuth");
const router = express.Router();

//FETCH AIRLINE FLIGHTS
router.get(
  "/flights",
  passport.authenticate("jwt", { session: false }),
  isAirline,
  airlineList
);

//CREATES FLIGHT OF AIRLINE
router.post(
  "/flights/add",
  passport.authenticate("jwt", { session: false }),
  isAirline,
  flightCreate
);

//EDIT FLIGHT
router.put(
  "/flights/:flightId",
  passport.authenticate("jwt", { session: false }),
  isAirline,
  flightEdit
);

module.exports = router;
