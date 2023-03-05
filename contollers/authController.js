const jwt = require("jwt-simple"),
  User = require("../models/user"),
  validationHandler = require("../validations/validationHandler"),
  config = require("../config");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("password");
    if (!user) {
      const err = new Error("User not found with given email");
      err.statusCode = 401;
      throw err;
    }
    const isValidPassword = user.validate(password);
    if (!isValidPassword) {
      const err = new Error("Invalid password!");
      err.statusCode = 401;
      throw err;
    }
    const token = jwt.encode({ id: user._id }, config.jwtSecret);
    const userInfo = await User.findById(user._id).populate(["following"]);
    res.status(200).json({
      userInfo,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    validationHandler(req);
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error("Email already in use!");
      err.statusCode = 403;
      throw err;
    }
    let newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.password = await newUser.encryptPassword(password);
    newUser = await newUser.save();
    const token = jwt.encode({ id: newUser._id }, config.jwtSecret);
    const userInfo = await User.findById(newUser._id);
    res.status(200).json({
      userInfo,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
