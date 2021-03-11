const { Flight, Airline } = require("../db/models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

exports.flightList = async (req, res, next) => {
  console.log(req.query);
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
exports.flightSearch = async (req, res, next) => {
  try {
    const { departureId, arrivalId } = req.query;
    const time = new Date();
    time.setHours(time.getHours() + 2);
    const inbound = await Flight.findAll({
      where: {
        departureAirportId: departureId,
        arrivalAirportId: arrivalId,
        businessseats: {
          [Op.gte]: req.body.businessSeats ?? 0,
        },
        economyseats: {
          [Op.gte]: req.body.economyseats ?? 0,
        },
        [Op.or]: [
          {
            departuretime: {
              [Op.gt]: time.toLocaleTimeString(),
            },
          },
          {
            departuredate: {
              [Op.gte]: new Date().toLocaleDateString(),
            },
          },
        ],
      },
    });

    const outbound = await Flight.findAll({
      where: {
        departureAirportId: arrivalId,
        arrivalAirportId: departureId,
        businessseats: {
          [Op.gte]: req.body.businessSeats ?? 0,
        },
        economyseats: {
          [Op.gte]: req.body.economyseats ?? 0,
        },
        departuretime: {
          [Op.gt]: sequelize.cast(sequelize.col("arrivaltime"), "time"),
        },
      },
    });
    res.status(200).json({ inbound, outbound });
  } catch (error) {
    next(error);
  }
};
