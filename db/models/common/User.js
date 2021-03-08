// const { Model, DataTypes } = require("sequelize");

// class User extends Model {}
// User.init({
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       min: {
//         args: 6,
//         msg: "Username length must be more than 6 characters",
//       },
//     },
//   },
//   password: {
//     type: DataTypes.STRING,
//     // allowNull: false,
//     // validate: {
//     //   is: {
//     //     args: "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$",
//     //     msg:
//     //       "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:",
//     //   },
//     // },
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true,
//     },
//     unique: {
//       args: true,
//       msg: "Email address already in use!",
//     },
//   },
// });
// module.exports = { User };
