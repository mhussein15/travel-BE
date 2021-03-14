const { User, Booking, Flight, Airline, Airport } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

//SIGNUP
exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    const payload = {
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
      role: "user",
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

//SIGNIN
exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
    role: "user",
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

//PROFILE INFO
exports.profile = async (req, res, next) => {
  try {
    const foundProfile = await User.findOne({
      where: { username: req.user.username },
      attributes: {
        exclude: ["id", "password", "gender", "createdAt", "updatedAt"],
      },
      include: {
        model: Booking,
        as: "booking",
        attributes: {
          exclude: ["updatedAt", "userId"],
        },
        include: [
          {
            model: Flight,
            as: "flights",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "departureAirportId",
                "arrivalAirportId",
                "businessSeats",
                "economySeats",
              ],
            },
            through: {
              attributes: [],
            },
            include: [
              { model: Airline, as: "airline", attributes: ["name"] },
              { model: Airport, as: "departureAirport", attributes: ["name"] },
              { model: Airport, as: "arrivalAirport", attributes: ["name"] },
            ],
          },
        ],
      },
    });
    res.status(200).json(foundProfile);
  } catch (error) {
    next(error);
  }
};
//USER EIDT PROFILE
exports.profileEdit = async (req, res, next) => {
  try {
    const updatedUser = await req.user.update(req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
