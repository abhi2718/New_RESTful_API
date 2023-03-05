const express = require("express"),
  authController = require("../contollers/authController"),
  passportJWT = require("../middlewares/passportJWT")(),
  { hasEmail, hasPassword, hasName } = require("../validations/validators"),
  router = express.Router();

router.post("/login", hasEmail, hasPassword, authController.login);
router.post("/signup", hasEmail, hasPassword, hasName, authController.signup);
router.get("/me", passportJWT.authenticate(), authController.me);

module.exports = router;
