const { Flight } = require("../../db/models");

//  CHECK IF NUMBER OF SEATS IS AVAIABLE
exports.bookingValidationRules = async (req, res, next) => {
  try {
    for (const flightId of req.body.flights) {
      let flight = await Flight.findByPk(flightId);
      if (req.body.economySeats > flight.get("economyseats")) {
        next({
          status: 422,
          message: `economy`,
        });
      }
      if (req.body.businessSeats > flight.get("businessseats")) {
        next({
          status: 422,
          message: `business`,
        });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
