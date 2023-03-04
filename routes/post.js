const express = require("express"),
  postController = require("../contollers/postController"),
  { description } = require("../validations/validators"),
  uploadImage = require("../middlewares/multer"),
  router = express.Router();

router.get("/", postController.index);
router.get("/:id", postController.show);
router.post(
  "/",
  uploadImage("posts").single("image"),
  description,
  postController.store
);

router.patch('/:id', description, postController.update);
router.delete('/:id', postController.delete);

module.exports = router;
