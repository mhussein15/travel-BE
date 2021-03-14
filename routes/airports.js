//IMORT FILES
const express = require("express");
const passport = require("passport");
const router = express.Router();

//IMPORT CONTROLLERS
const {
  airportList,
  airportCreate,
} = require("../controllers/airportController");

//IMPORT AUTH
const { isAirline } = require("../middleware/auth/isAuth");
//IMPORT VALIDATION
const {
  airportValidationRules,
} = require("../middleware/validator/airportValidator");
const { validate } = require("../middleware/validator/validate");

//ROUTER

//GET AIRPORT LIST
router.get(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  //   isAirline,
  airportList
);

//CREATE AIRPORT LIST
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAirline,
  airportValidationRules(),
  validate,
  airportCreate
);

module.exports = router;
