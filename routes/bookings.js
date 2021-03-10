const express = require("express");
const passport = require("passport");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
//list flight
router.post("/", bookingController.createBooking);

module.exports = router;
