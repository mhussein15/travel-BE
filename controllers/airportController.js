const { Airport } = require("../db/models");

// exports.fetchAirport = async (airportId, next) => {
//   try {
//     const foundAirport = await Airport.findByPk(airportId);
//     return foundAirport;
//   } catch (error) {
//     next(error);
//   }
// };

exports.airportCreate = async (req, res, next) => {
  try {
    const newAirport = await Airport.create(req.body);
    res.status(201).json(newAirport);
  } catch (error) {
    next(error);
  }
};

exports.airportList = async (req, res, next) => {
  const airports = await Airport.findAll();
  res.status(200).json(airports);
};
