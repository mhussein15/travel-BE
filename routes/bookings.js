const express = require("express");
const passport = require("passport");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const {
  bookingValidationRules,
} = require("../middleware/validator/bookingValidator");
//FLIGHT BOOKING
router.post(
  "/",
  bookingValidationRules,
  createBooking
);
router.post(
  "/user",
  passport.authenticate("jwt", { session: false }),
  bookingValidationRules,
  createBooking
);

module.exports = router;
