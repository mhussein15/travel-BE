const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signin, signup } = require("../controllers/passengersController");

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
module.exports = router;
