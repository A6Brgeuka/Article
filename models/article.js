var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    title:{
        type: String,
        unique: true,
        required: true
    },
    body:{
        type: String
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created:{
        type: Date,
        default: Date.now
    }
});

schema.statics.getArticles = function (callback) {
  var Article = this;

  // Article.find({}, [], function (err, articles) {
  //   if(err) return callback(err);
  //
  //   callback(null, articles);
  // });

  Article
    .find({})
    .sort('-created')
    .exec(function (err, articles) {
      if(err) return callback(err);

      callback(null, articles);
    });
}

schema.statics.getArticle = function (articleId, callback) {
  var Article = this;

  Article.findOne({_id: articleId}, function (err, article) {
    if(err) return callback(err);

    callback(null, article);
  });

}

schema.statics.create = function (title, body, userId, callback) {

  var Article = this;

  Article.findOne({title: title}, function (err, article) {
    if(err) return callback(err);

    if(!article){
      var newArticle = new Article({
        title: title,
        body: body,
        Author: userId
      });

      newArticle.save(function (err, article, affected) {
        if(err) return callback(err);

        callback();
      })
    } else {
      callback(new Error("Title exists"));
    }
  });
}

exports.Article = mongoose.model('Article', schema);
