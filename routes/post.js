const express = require("express"),
  postController = require("../contollers/postController"),
  {hasName} = require("../validations/validators"),
  router = express.Router();

router.get("/", postController.index);
router.post("/",hasName, postController.store);

module.exports = router;
