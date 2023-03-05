const { body } = require("express-validator");

exports.description = body("description")
  .isLength({ min: 5 })
  .withMessage("Description is required and must be at least 5 characters");

exports.hasEmail = body("email")
  .isEmail()
  .withMessage("Email field must contain a correct email address!");

exports.hasPassword = body("password")
  .exists()
  .withMessage("Password is required !");

exports.hasName = body("name")
  .isLength({ min: 5 })
  .withMessage("name is required and must be at least 5 characters");
