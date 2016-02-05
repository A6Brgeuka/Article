var express = require('express');
var router = express.Router();

module.exports = function(app){
  app.use('/', require('./frontpage'));

  app.use('/auth', require('./auth/index'));
};
