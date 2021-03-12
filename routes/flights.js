const express = require("express");
const passport = require("passport");
const {flightSearch } = require("../controllers/flightController");
const router = express.Router();

//list flight search
router.get("/search", flightSearch);

module.exports = router;
