"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Airline to Flights Relation
db.Airline.hasMany(db.Flight, { foreignKey: "airlineId", as: "flights" });
db.Flight.belongsTo(db.Airline, { foreignKey: "airlineId", as: "airline" });

//Airport and Flight
db.Airport.hasMany(db.Flight, {
  foreignKey: "departureAirportId",
  as: "departureflight",
});
db.Flight.belongsTo(db.Airport, {
  foreignKey: "departureAirportId",
  as: "departureAirport",
});

db.Airport.hasMany(db.Flight, {
  foreignKey: "arrivalAirportId",
  as: "arrivalflight",
});
db.Flight.belongsTo(db.Airport, {
  foreignKey: "arrivalAirportId",
  as: "arrivalAirport",
});

//Booking and Passenger
db.Booking.hasMany(db.Passenger, { foreignKey: "bookingId" });
db.Passenger.belongsTo(db.Booking, { foreignKey: "bookingId" });

//Booking AND Flight
db.Booking.belongsToMany(db.Flight, {
  through: "FlightBooking",
  foreignKey: "bookingId",
  as: "flights",
});
db.Flight.belongsToMany(db.Booking, {
  through: "FlightBooking",
  foreignKey: "flightId",
  as: "bookings",
});

//User and Booking
db.User.hasMany(db.Booking, { foreignKey: "userId", as: "booking" });
db.Booking.belongsTo(db.User, { foreignKey: "userId", as: "user" });

module.exports = db;
