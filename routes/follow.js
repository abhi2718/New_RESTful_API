const express = require("express"),
  followController = require("../contollers/followController"),
  router = express.Router();

router.post("/:id", followController.fllow);

module.exports = router;