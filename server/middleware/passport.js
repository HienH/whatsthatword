const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

// use env config
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        // User.findById({ _id: jwt_payload.user._id }.populate('addedWords'), (err, user) => {
        //     if (err) {
        //         return done(err, false)
        //     }
        //     if (user) {
        //         return done(null, user)
        //     } else {
        //         return done(null, false)
        //     }
        // });

        User.findById({ _id: jwt_payload.user._id }).populate('addedWords')
            .then(user => { return done(null, user) })
            .catch(err => { return done(null, false) });
    }));
};