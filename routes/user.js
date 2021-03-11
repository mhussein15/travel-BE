//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");
//IMPORT CONTROLLERS
const {
  signin,
  signup,
  profile,
  fetchUser,
} = require("../controllers/usersController");
const { isUser } = require("../middleware/auth/airportAuth");
//IMPORT VALIDATION RULES
const {
  userSigninValidationRules,
  userSignupValidationRules,
} = require("../middleware/validator/userValidator");
const { validate } = require("../middleware/validator/validate");

//ROUTER
// router.param("username", async (req, res, next, username) => {
//   console.log(req);
//   if (req.user.username === username) {
//     const foundUser = await fetchUser(username, next);
//     if (foundUser) {
//       req.profile = foundUser;
//       next();
//     } else {
//       next({
//         status: 404,
//         message: "User not found",
//       });
//     }
//   } else {
//     next({
//       status: 401,
//       message: "Unauthorized",
//     });
//   }
// });

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

//FETCH USER
router.get(
  "/profile/:username",
  passport.authenticate("jwt", { session: false }),
  isUser,
  profile
);

module.exports = router;
