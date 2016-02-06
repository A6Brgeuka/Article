var express = require('express');
var router = express.Router();
var User = require('models/user').User;

router.get('/', function(req, res, next){
    console.log('get: auth');
});

router.post('/signin', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.singIn(username, password, function(err, user){
        if(err) {
            res.json({err: err.messsage});
        } else {
            req.session.user = user._id;
            res.json({true: true});
        }
    });
});

router.post('/signup', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.signUp(username, password, function(err, user){
        if(err) {
            res.json({err: err.messsage});
        } else {
            req.session.user = user._id;
            res.json({true: true});
        }
    });
});

router.post('/signout', function (req, res, next) {
    req.session.destroy(function (err) {
        if(err) return res.json(err);
        res.json({});
    });
})

module.exports = router;
