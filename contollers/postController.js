const validationHandler = require("../validations/validationHandler"),
  Post = require("../models/post");

exports.index = async (req, res, next) => {
  try {
    const posts = await Post.find({
      userRef: { $in: [...req.user.following, req.user._id] },
    })
      .populate("userRef")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

exports.show = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userRef: { $in: [...req.user.following, req.user._id] },
    }).populate("userRef");
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    validationHandler(req);
    let post = new Post();
    post.description = req.body.description;
    post.userRef = req.user._id;
    post.image = req.file.filename;
    post = await post.save();

    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    validationHandler(req);
    let post = await Post.findById(req.params.id);
    if (!post || !post.userRef.equals(req.user._id)) {
      const err = new Error("Wrong request");
      err.statusCode = 400;
      throw err;
    }
    post.description = req.body.description;
    post = await post.save();

    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post || !post.userRef.equals(req.user._id)) {
      const err = new Error("Wrong request");
      err.statusCode = 400;
      throw err;
    }
    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};
