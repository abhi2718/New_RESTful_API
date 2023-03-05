const User = require("../models/user");

exports.fllow = async (req, res, next) => {
  try {
    req.user.following.push(req.params.id);
    await req.user.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

