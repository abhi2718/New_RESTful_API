const { body } = require("express-validator");

exports.hasName = body("name")
    .isLength({min: 5})
    .withMessage("Name is required and must be at least 5 characters")