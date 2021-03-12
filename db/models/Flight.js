const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define("Flight", {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "Only numbers allowed",
        },
      },
    },
    departureDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: "Not a valid date",
        },
      },
      get() {
        return moment(this.getDataValue("departureDate")).format("LLLL");
      },
    },
    arrivalDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: "Not a valid date",
        },
        getDate(value) {
          if (
            moment(value).isBefore(moment(this.departureDate)) ||
            moment(value).isSame(moment(this.departureDate))
          ) {
            throw new Error("Arrival Date and Time cant be before Departure Date and Time");
          }
        },
      },
      get() {
        return moment(this.getDataValue("arrivalDate")).format("LLLL");
      },
    },
    economySeats: { type: DataTypes.INTEGER, allowNull: false },
    businessSeats: { type: DataTypes.INTEGER, allowNull: false },
  });

  return Flight;
};
