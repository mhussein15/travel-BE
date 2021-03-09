const { body } = require("express-validator");

//USER SIGNIN VALIDATION
exports.userSigninValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is empty").trim().toLowerCase(),
    body("password")
      .notEmpty()
      .withMessage("Password is empty")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .withMessage(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"
      ),
  ];
};

//USER SIGNUP VALIDATION
exports.userSignupValidationRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username is empty")
      .trim()
      .toLowerCase(),
    body("password")
      .notEmpty()
      .withMessage("Password is empty")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .withMessage(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"
      ),
    body("email").isEmail().normalizeEmail(),
  ];
};
