const { Airline, Flight, Airport } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const moment = require("moment");

//AIRLINE USER SIGNUP
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

//AIRLINE USER SIGNIN
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

//FETCH AIRLINE LIST
exports.airlineList = async (req, res, next) => {
  try {
    const airlines = await Flight.findAll({
      where: { airlineId: req.user.id },
      order: ["id"],
      include: [
        { model: Airport, as: "departureAirport", attributes: ["name"] },
        { model: Airport, as: "arrivalAirport", attributes: ["name"] },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "departureAirportId",
          "arrivalAirportId",
          "airlineId",
        ],
      },
    });
    res.status(200).json(airlines);
  } catch (error) {
    next(error);
  }
};

//CREATES FLIGHT OF AIRLINE
exports.flightCreate = async (req, res, next) => {
  try {
    req.body.airlineId = req.user.id;
    const inbound = await Flight.create(req.body);

    const depatureDateAndTime = moment(req.body.departureDate);
    const arrivalDateAndTime = moment(req.body.arrivalDate);
    const flightDuration = moment
      .duration(arrivalDateAndTime - depatureDateAndTime)
      .asMinutes();

    const outbound = await Flight.create({
      ...req.body,
      departureAirportId: req.body.arrivalAirportId,
      arrivalAirportId: req.body.departureAirportId,
      departureDate: moment(arrivalDateAndTime).add(1, "h"),
      arrivalDate: moment(moment(arrivalDateAndTime).add(1, "h")).add(
        flightDuration,
        "minute"
      ),
    });
    res.status(201).json({ inbound, outbound });
  } catch (error) {
    next(error);
  }
};

//EDIT FLIGHT OF AIRLINE
exports.flightEdit = async (req, res, next) => {
  try {
    const flight = await Flight.findByPk(+req.params.flightId);
    if (flight) {
      if (flight.airlineId === req.user.id) {
        await flight.update(req.body);
        res.sendStatus(204);
      } else {
        next({
          status: 401,
          message: "Unauthorized",
        });
      }
    } else {
      next({
        status: 404,
        message: "Flight Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
