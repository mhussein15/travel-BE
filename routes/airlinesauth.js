//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");

//IMPORT CONTROLLERS
const { signin, signup } = require("../controllers/airlinesController");

//IMPORT VALIDATION RULES
const {
  userSigninValidationRules,
  userSignupValidationRules,
} = require("../middleware/validator/userValidator");
const { validate } = require("../middleware/validator/validate");

//SIGNIN
router.post(
  "/airline-signin",
  userSigninValidationRules(),
  validate,
  passport.authenticate("local", { session: false }),
  signin
);
//SIGNUP
router.post("/airline-signup", userSignupValidationRules(), validate, signup);
module.exports = router;
