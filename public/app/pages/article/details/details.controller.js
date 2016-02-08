(function() {
    'use strict';

    angular
        .module("blog.article")
        .controller('ArticleDetailsController', articleDetailsController);


    articleDetailsController.$inject = ['ArticleService', '$stateParams','$state'];

    function articleDetailsController(ArticleService, $stateParams, $state){
      var vm = this;
      vm.test = "hello from articleDetailsController";
      vm.articleId = $stateParams.articleId;

      getArticle();

      function getArticle() {
        ArticleService
          .get(vm.articleId)
          .then(function (response) {
            vm.article = response.data.article;
          })
          .catch(function (error) {
            console.log("FATAL ERR");
            console.log(error);
          })
      }
    }
})();
