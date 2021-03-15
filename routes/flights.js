const express = require("express");
const {
  flightInbound,
  flightOutbound,
} = require("../controllers/flightController");
const router = express.Router();

//list flight search
router.get("/search/inbound", flightInbound);
router.get("/search/outbound", flightOutbound);

module.exports = router;
