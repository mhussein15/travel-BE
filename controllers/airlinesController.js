const { Airline, Flight } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await Airline.create(req.body);
    const payload = {
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
      role: "airline",
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
    role: "airline",
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

exports.airlineList = async (req, res, next) => {
  try {
    const airlines = await Airline.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: { model: Flight, as: "flights", attributes: ["id"] },
    });
    res.status(200).json(airlines);
  } catch (error) {
    next(error);
  }
};

exports.airlineDetail = async (req, res, next) => {
  res.status(200).json(req.airline);
};

exports.flightCreate = async (req, res, next) => {
  try {
    req.body.airlineId = req.airline.id;
    const newFlight = await Flight.create(req.body);

    res.status(201).json(newFlight);
  } catch (error) {
    next(error);
  }
};

exports.fetchAirline = async (airlineId, next) => {
  try {
    const foundAirline = await Airline.findByPk(airlineId);
    if (foundAirline) return foundAirline;
    else next({ message: "Airline does not exist" });
  } catch (error) {
    next(error);
  }
};
