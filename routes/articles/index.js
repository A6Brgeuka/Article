'use strict';
var express = require('express');
var router = express.Router();
var Article = require('models/article').Article;


router.get("/", function (req, res, next) {   // get articles
  Article.getArticles(function (err, articles) {
    if (err) return res.status(500).json({"err": err.message});

    res.json({"articles" : articles});
  });
});

router.post("/", function (req, res, next) {  // create article

  var title = req.body.title;
  var body = req.body.body;
  var userId = req.session.user;

  Article.create(title, body, userId, function (err) {
    if(err) return res.status(406).json({"err" : err.message});

    res.json({});
  });
});

router.get("/:id", function (req, res, next) {  // get article
  console.log(req.params.id);
  Article.getArticle(req.params.id, function (err, article) {
    if(err) return res.status(406).json({"err" : err.message});

    res.json({"article" : article});
  });
});

router.put("/:id", function (req, res, next) {  // edit article
  res.json({"FATAL_ERRRRRRRO" : "FATAL_ERRRRRRRO"})
});

router.delete('/:id', function (req, res, next) { //delete article

})



module.exports = router;
