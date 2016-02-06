var crypto = require('crypto');
var async = require('async');
var util = require('util');

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.singIn = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new Error("Invalid login or password"));
                }
            } else {
                callback(new Error("User does not exist"));
            }
        }
    ], callback);
};

schema.statics.signUp = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (!user) {
                if(password){
                    var newUser = new User(
                        {
                            username: username,
                            password: password
                        }
                    );
                    newUser.save(function(err) {
                        if (err) return callback(err);
                        callback(null, newUser);
                    });
                } else {
                    callback(new Error("Password is invalid"));
                }
            } else {
                callback(new Error("User exist"));
            }
        }
    ], callback);
};

schema.statics.changePassword = function(login, password, callback){
    var User = this;

    User.findOne({login: login}, function(err, user){
        if(err) return callback(err);

        var hashedPassword = user.encryptPassword(password);

        User.update(
            {
                login: login
            },
            {
                $set:{
                    hashedPassword: hashedPassword
                }
            },
            {
                multi: true
            },
            function(err){
                if(err) return callback(err);


                callback(null, user);
            }
        );
    });
};

exports.User = mongoose.model('User', schema);
