const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.fetchUser = async (username, next) => {
  try {
    const foundUser = await User.findOne({
      where: { username },
      attributes: {
        exclude: [
          "id",
          "username",
          "password",
          "gender",
          "createdAt",
          "updatedAt",
        ],
      },
    });

    return foundUser;
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    const payload = {
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
      role: "user",
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
    role: "user",
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// exports.profile = (req, res) => {
//   res.status(200).json(req.profile);
// };

exports.profile = async (req, res, next) => {
  try {
    let foundProfile;
    if (req.user.username === req.params.username) {
      foundProfile = await User.findOne({
        where: { username: req.params.username },
        attributes: {
          exclude: [
            "id",
            "username",
            "password",
            "gender",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.status(200).json(foundProfile);
    } else {
      next({
        status: 401,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    next(error);
  }
};
