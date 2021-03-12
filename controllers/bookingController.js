const { Booking, Passenger, Flight } = require("../db/models");

exports.createBooking = async (req, res, next) => {
  try {
    //Create Booking
    const newBooking = await Booking.create();

    //Destruct Passengers Array
    const cart = req.body.passengers.map((passenger) => ({
      ...passenger,
      bookingId: newBooking.id,
    }));

    //Creating Passengers
    const passengers = await Passenger.bulkCreate(cart);

    //Adding flights
    newBooking.addFlights(req.body.flights);

    //Seats Update
    req.body.flights.forEach(async (x) => {
      let flight = await Flight.findByPk(x);
      if (req.body.economySeats) {
        await flight.update({
          economySeats: flight.get("economySeats") - req.body.economySeats,
        });
      } else if (req.body.businessSeats) {
        await flight.update({
          businessSeats: flight.get("businessSeats") - req.body.businessSeats,
        });
      }
    });

    res.status(201).json({
      passengers,
    });
  } catch (error) {
    next(error);
  }
};
