var express = require('express');
var router = express.Router();
var User = require('models/user').User;

router.get('/', function(req, res, next){
    console.log('get: auth');
});

router.post('/signin', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    console.log(req.body);

    User.singIn(username, password, function(err, user){
        if(err) {
            res.json({err : err});
        } else {
            req.session.user = user._id;
            res.json({});
        }
    });
});

router.post('/signup', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.signUp(username, password, function(err, user){
        if(err) {
            res.json(err);
        } else {
            req.session.user = user._id;
            res.json({});
        }
    });
});

module.exports = router;