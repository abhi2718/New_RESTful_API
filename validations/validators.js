const { body } = require("express-validator");

exports.description = body("description")
    .isLength({min: 5})
    .withMessage("Description is required and must be at least 5 characters")