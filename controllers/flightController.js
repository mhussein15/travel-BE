const { Flight, Airline, Airport } = require("../db/models");
const { Op } = require("sequelize");
const moment = require("moment");

//FLIGHT INBOUND
exports.flightInbound = async (req, res, next) => {
  try {
    const { departureId, arrivalId, businessSeats, economyseats } = req.query;
    const inbound = await Flight.findAll({
      where: {
        departureAirportId: departureId,
        arrivalAirportId: arrivalId,
        businessSeats: {
          [Op.gte]: businessSeats ?? 0,
        },
        economySeats: {
          [Op.gte]: economyseats ?? 0,
        },
        departureDate: {
          [Op.gte]: moment().add(2, "hours").format("LLLL"),
        },
      },
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
      include: [
        { model: Airline, as: "airline", attributes: ["name"] },
        { model: Airport, as: "departureAirport", attributes: ["name"] },
        { model: Airport, as: "arrivalAirport", attributes: ["name"] },
      ],
    });

    res.status(200).json(inbound);
  } catch (error) {
    next(error);
  }
};

//FLIGHT OUTBOUND
exports.flightOutbound = async (req, res, next) => {
  try {
    const {
      departureId,
      arrivalId,
      businessSeats,
      economyseats,
      arrivalDate,
    } = req.query;
    const outbound = await Flight.findAll({
      where: {
        departureAirportId: arrivalId,
        arrivalAirportId: departureId,
        businessSeats: {
          [Op.gte]: businessSeats ?? 0,
        },
        economySeats: {
          [Op.gte]: economyseats ?? 0,
        },
        departureDate: {
          [Op.gte]: moment(arrivalDate).add(2, "hours"),
        },
      },
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
      include: [
        { model: Airline, as: "airline", attributes: ["name"] },
        { model: Airport, as: "departureAirport", attributes: ["name"] },
        { model: Airport, as: "arrivalAirport", attributes: ["name"] },
      ],
    });
    res.status(200).json(outbound);
  } catch (error) {
    next(error);
  }
};
