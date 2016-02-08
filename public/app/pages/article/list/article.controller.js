(function() {
    'use strict';

    angular
        .module("blog.article")
        .controller('ArticleController', articleController);


    articleController.$inject = ['ArticleService', '$state'];

    function articleController(ArticleService, $state){
      var vm = this;
      vm.test = "hello from articleController";

      getArticles();

      function getArticles() {
        ArticleService
          .getList()
          .then(function (response) {
            vm.articles = response.data.articles;
          })
          .catch(function (error) {
            console.log("FATAL ERR");
            console.log(error);
          })
      }
    }
})();
