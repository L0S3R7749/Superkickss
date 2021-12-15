const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const user = await User.findOne({username: username, userRight: 'user'}).lean();
            if (!user) {
                return done(null, false, {message : 'Incorrect username.'});
            }
            if (!validPassword(user, password)) {
                return done(null, false, {message : 'Incorrect password.'});
            }
            if(user.isLock===true){
                return done(null, false, {message : 'Your account has been locked.'});
            }
            console.log(user);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

function validPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
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