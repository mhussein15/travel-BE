module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define(
    "Flight",
    {
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
      departuredate: {
        type: DataTypes.DATEONLY,
        unique: true,
        validate: {
          isDate: {
            args: true,
            msg: "Not a valid date",
          },
        },
      },
      departuretime: { type: DataTypes.TIME, allowNull: false },
      arrivaldate: {
        type: DataTypes.DATEONLY,
        unique: true,
        validate: {
          isDate: {
            args: true,
            msg: "Not a valid date",
          },
        },
      },
      arrivaltime: { type: DataTypes.TIME, allowNull: false },
    },
    {
      validate: {
        arrivalDateAfterdepartureDate() {
          if (this.departuredate > this.arrivaldate) {
            throw new Error("Arrival date must be after the departure date.");
          }
        },
      },
    }
  );

  return Flight;
};
