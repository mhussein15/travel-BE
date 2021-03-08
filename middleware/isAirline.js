exports.isAirline = (req, res, next) => {
  if (req.role === "airline") {
    next();
  } else {
    next({
      status: 401,
      message: "Go Away",
    });
  }
};
