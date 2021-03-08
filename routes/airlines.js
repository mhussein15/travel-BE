const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signin, signup } = require("../controllers/airlinesController");

router.post(
  "/airline-signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/airline-signup", signup);
module.exports = router;
