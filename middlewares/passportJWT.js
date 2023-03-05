const passport = require("passport"),
  passportJWT = require("passport-jwt"),
  User = require("../models/user"),
  config = require("../config");

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = () => {
  const strategy = new Strategy(params, async (playload, done) => {
    const user = await User.findById(playload.id);
    if (!user) {
      return done(new Error("User not found !"), false);
    }
    return done(null, user);
  });
  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", { session: false });
    },
  };
};
