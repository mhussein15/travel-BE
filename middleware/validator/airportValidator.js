const { body} = require("express-validator");
exports.airportValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name cant be empty")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 chars long"),
    body("location")
      .notEmpty()
      .withMessage("Location cant be empty")
      .isLength({ min: 2 })
      .withMessage("must be at least 2 chars long"),
  ];
};
