const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/schema/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const user = await User.findOne({username: username}).lean();
            if (!user) {
                return done(null, false, {message : 'Incorrect username.'});
            }
            if (!validPassword(user, password)) {
                return done(null, false, {message : 'Incorrect password.'});
            }
            console.log(user);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

function validPassword(user, password) {
    //return bcrypt.compareSync(password, user.password);
    return user.password === password;
};

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
})

module.exports = passport;