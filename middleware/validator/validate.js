const { validationResult } = require("express-validator");

//VALIDATION MESSAGE
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  next({
    status: 422,
    message: extractedErrors,
  });
};

