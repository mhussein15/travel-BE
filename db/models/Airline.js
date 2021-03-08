const { Sequelize } = require("sequelize");
const { commonUser } = require("./common/common.user.js");
module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define("Airline", {
    ...commonUser,
    name: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
  });
  return Airline;
};
