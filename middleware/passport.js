const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const { Passenger, Airline } = require("../db/models");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      let user;
      if (req.path === "/airline-signin") {
        user = await Airline.findOne({
          where: { username },
        });
      } else if (req.path === "/signin") {
        user = await Passenger.findOne({
          where: { username },
        });
      }
      if (user) {
        passwordsMatch = await bcrypt.compare(password, user.password);
      } else {
        passwordsMatch = false;
      }
      if (passwordsMatch) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      done(error);
    }
  }
);

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    passReqToCallback: true,
  },
  async (req, jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      let user;
      if (jwtPayload.role === "airline") {
        user = await Airline.findOne({
          where: { username: jwtPayload.username },
        });
      } else if (jwtPayload.role === "passenger") {
        console.log("jwt passenger");
        user = await Passenger.findOne({
          where: { username: jwtPayload.username },
        });
      }
      req.role = jwtPayload.role;
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
