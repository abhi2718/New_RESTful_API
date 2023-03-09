const User = require("../models/user");

exports.fllow = async (req, res, next) => {
  try {
    // req.user.following.push(req.params.id);
    // await req.user.save();
    const user = await User.updateOne({
      _id: req.params.id,
      "following.id":req.params.id 
    }, {
      $set:{ "following.$.name":"Shivani Abhishek Singh" },
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

