'use strict';
var express = require('express');
var router = express.Router();
var Article = require('models/article').Article;


router.get("/", function (req, res, next) {
  Article.getArticles(function (err, articles) {
    if (err) return res.status(500).json({"err": err.message});
    
    res.json({"articles" : articles});
  });
});

router.get("/details/:id", function (req, res, next) {
  console.log(req.params.id);
  Article.getArticle(req.params.id, function (err, article) {
    if(err) return res.status(406).json({"err" : err.message});

    res.json({"article" : article});
  });
});

router.post("/create", function (req, res, next) {

  var title = req.body.title;
  var body = req.body.body;
  var userId = req.session.user;

  Article.create(title, body, userId, function (err) {
    if(err) return res.status(406).json({"err" : err.message});

    res.json({});
  });
});



module.exports = router;
