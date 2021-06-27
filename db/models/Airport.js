const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define(
    "Airport",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Airport already exists",
        },
        validate: {
          len: {
            args: [3, 50],
            msg: "Airport name must be between 3 and 50 characters",
          },
        },
      },

      slug: {
        type: DataTypes.STRING,
        unique: true,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: "Location must be between 2 and 50 characters",
          },
        },
      },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Airport, {
    source: ["name"],
  });
  return Airport;
};
