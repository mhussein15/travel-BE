const { DataTypes } = require("sequelize");

const commonUser = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6],
        msg: "Username length must be more than 6 characters",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   is: {
    //     args: ["^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$","i"],
    //     msg:
    //       "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:",
    //   },
    // },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: {
      args: true,
      msg: "Email address already in use!",
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
};

module.exports = { commonUser };
