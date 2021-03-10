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
    departuredate: {
      type: DataTypes.DATEONLY,
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
      validate: {
        isDate: {
          args: true,
          msg: "Not a valid date",
        },
      },
    },
    arrivaltime: { type: DataTypes.TIME, allowNull: false },
    economyseats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    businessseats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
  });

  return Flight;
};
