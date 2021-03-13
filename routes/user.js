//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");

//IMPORT CONTROLLERS
const {
  signin,
  signup,
  profile,
  profileEdit,
} = require("../controllers/usersController");
const { isUser } = require("../middleware/auth/airportAuth");

//IMPORT VALIDATION RULES
const {
  userSigninValidationRules,
  userSignupValidationRules,
} = require("../middleware/validator/userValidator");
const { validate } = require("../middleware/validator/validate");

//SIGNIN
router.post(
  "/signin",
  userSigninValidationRules(),
  validate,
  passport.authenticate("local", { session: false }),
  signin
);
//SIGNUP
router.post("/signup", userSignupValidationRules(), validate, signup);

//FETCH USER PROFILE
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  isUser,
  profile
);

router.put(
  "/profile/edit",
  passport.authenticate("jwt", { session: false }),
  isUser,
  profileEdit
);
module.exports = router;
