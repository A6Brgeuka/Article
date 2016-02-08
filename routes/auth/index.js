var express = require('express');
var router = express.Router();
var User = require('models/user').User;
var jwt = require('jsonwebtoken');
var secret = require('config').get('session:secret');

router.get('/', function(req, res, next){
    console.log('get: auth');
});

router.post('/signin', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.singIn(username, password, function(err, user){
        if(err) {
          res.status(401).json({"err": err.message});
        } else {
          req.session.user = user._id;

          console.log(user);
          console.log(secret);

          jwt.sign(user, secret, { expiresInMinutes: 60*5 }, function (token) {
            res.json({"token": token});
          })
        }
    });
});

router.post('/signup', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.signUp(username, password, function(err, user){
        if(err) {
          res.status(401).json({"err": err.message})
        } else {
          req.session.user = user._id;
          jwt.sign(user, secret, { expiresInMinutes: 60*5 }, function (token) {
            res.json({"token": token});
          })
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
