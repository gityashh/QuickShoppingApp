const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var {User} = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });

            await user.save();
        }

        return cb(null, user);
    } catch (error) {
        return cb(error, false); 
    }
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function(id, cb) {
    try {
        let user = await User.findById(id);
        cb(null, user); 
    } catch (error) {
        cb(error, null);
    }
});

module.exports = passport;