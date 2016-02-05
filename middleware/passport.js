var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('models/user').User;

module.exports = function(req, res, next){
    console.log("ASDADS");
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!User.checkPassword(password)) { return done(null, false); }
                req.session.user = user._id;
                return done(null, user);
            });
        }
    ));
};

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});