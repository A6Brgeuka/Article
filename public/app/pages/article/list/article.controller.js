(function() {
    'use strict';

    angular
        .module("blog.article")
        .controller('ArticleController', articleController);


    articleController.$inject = [];

    function articleController(){
      var vm = this;
      vm.test = "hello from articleController";
    }
})();
