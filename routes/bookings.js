const express = require("express");
const passport = require("passport");
const router = express.Router();
const {createBooking} = require("../controllers/bookingController");
const {
  bookingValidationRules,
} = require("../middleware/validator/bookingValidator");
const { validate } = require("../middleware/validator/validate");
//list flight
router.post(
  "/",
  bookingValidationRules,
  createBooking
);

module.exports = router;
