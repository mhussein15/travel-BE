const { Flight, Airline, Airport } = require("../db/models");
const { Op } = require("sequelize");
const moment = require("moment");

//FLIGHT INBOUND
exports.flightInbound = async (req, res, next) => {
  try {
    const {
      departureId,
      arrivalId,
      businessSeats,
      economyseats,
      departureDate,
    } = req.query;

    let departureDateAndTime = moment(departureDate).format("ll");

    let today = moment(new Date()).format("ll");

    if (moment(today).isSame(departureDateAndTime)) {
      departureDateAndTime = moment(departureDate).add(2, "hours");
    } else {
      departureDateAndTime = departureDate;
    }

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
          [Op.gte]: departureDateAndTime,
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
          "airlineId",
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
      departureDate,
      arrivalDate,
    } = req.query;

    let departureDateAndTime = moment(arrivalDate).format("ll");

    let departure = moment(departureDate).format("ll");

    if (moment(departure).isSame(departureDateAndTime)) {
      departureDateAndTime = moment(arrivalDate).add(2, "hours");
    } else {
      departureDateAndTime = departureDate;
    }
    
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
          [Op.gte]: departureDateAndTime,
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
          "airlineId",
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
