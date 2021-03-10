const { Flight, Airline } = require("../db/models");

exports.flightList = async (req, res, next) => {
  try {
    const flights = await Flight.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: { model: Airline, as: "airline", attributes: ["username"] },
    });
    res.status(200).json(flights);
  } catch (error) {
    next(error);
  }
};
