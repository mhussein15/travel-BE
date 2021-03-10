const { Airport } = require("../db/models");

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
