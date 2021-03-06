const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define("Passenger", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      validation: {
        isDate: true,
      },
    },
    gender: {
      type: Sequelize.CHAR,
    },
  });
  return Passenger;
};
