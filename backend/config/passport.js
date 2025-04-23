const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({_id : jwt_payload.id});
    if (!user) {
        return done(null, false);
    }
    if(user) {
        return done(null, user);
    }
    } catch (error) {
        return done(error, false);
    }

}));

