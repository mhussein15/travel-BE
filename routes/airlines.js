const express = require("express");
const passport = require("passport");
const {
  fetchAirline,
  flightCreate,
  airlineList,
  airlineDetail,
} = require("../controllers/airlinesController");
const { isAirline } = require("../middleware/auth/airportAuth");
const router = express.Router();

router.param("airlineId", async (req, res, next, airlineId) => {
  const foundAirline = await fetchAirline(airlineId, next);
  if (foundAirline) {
    req.airline = foundAirline;
    next();
  } else {
    next({
      status: 404,
      message: "Airline not found",
    });
  }
});

//FETCH AIRLINE FLIGHTS
router.get(
  "/:airlineId/flights",
  passport.authenticate("jwt", { session: false }),
  airlineList
);

//CREATES FLIGHT OF AIRLINE
router.post(
  "/:airlineId/flights",
  passport.authenticate("jwt", { session: false }),
  isAirline,
  flightCreate
);

module.exports = router;
