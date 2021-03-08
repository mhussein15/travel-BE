const { Sequelize } = require("sequelize");
const { commonUser } = require("./common/common.user.js");
module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define("Passenger", {
    ...commonUser,
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
