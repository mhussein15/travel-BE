const { Booking, Passenger, Flight } = require("../db/models");

exports.createBooking = async (req, res, next) => {
  try {
    req.body.flights.map(async (x) => {
      let flight = await Flight.findByPk(x);
      if (req.body.economySeats) {
        await flight.update({
          economyseats: flight.get("economyseats") - req.body.economySeats,
        });
      } else if (req.body.businessSeats) {
        await flight.update({
          businessseats: flight.get("businessseats") - req.body.businessSeats,
        });
      }
    });

    const newBooking = await Booking.create();

    const cart = req.body.passengers.map((passenger) => ({
      ...passenger,
      bookingId: newBooking.id,
    }));

    //Creating Passengers
    const passengers = await Passenger.bulkCreate(cart);

    //Adding flights
    newBooking.addFlights(req.body.flights);

    //Seats Update

    res.status(201).json({
      passengers,
    });
  } catch (error) {
    next(error);
  }
};
