const jwt = require("passport-jwt");
const passport = require("passport");
const User = require("../models/user.js");
const { JWT_SECRET } = require("../config/server_config.js");

const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;
const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};

async function passportAuth(passport) {
    passport.use(new jwtStrategy(opts, async (jwt_payload, next) => {
        const user = await User.findById(jwt_payload.id);
        if (!user) {
            next(null, false);
        } else {
            next(null, user);
        }
    }));
};

module.exports = passportAuth;