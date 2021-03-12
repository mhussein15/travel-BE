const { Flight, Airline, Airport } = require("../db/models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const moment = require("moment");


exports.flightSearch = async (req, res, next) => {
  try {
    const {
      departureId,
      arrivalId,
      roundtrip,
      businessSeats,
      economyseats,
    } = req.query;
    const time = moment();
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
          [Op.gte]: time.add(2, "hours").format("LLLL"),
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

    let outbound;
    if (roundtrip === "true") {
      outbound = await Flight.findAll({
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
            [Op.gte]: moment(sequelize.col("arrivalDate")).add(2, "hours"),
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
    }
    res.status(200).json({ inbound, outbound });
  } catch (error) {
    next(error);
  }
};
