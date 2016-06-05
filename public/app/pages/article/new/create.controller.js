(function() {
    'use strict';

    angular
        .module("blog.article")
        .controller('ArticleCreateController', articleCreateController);


    articleCreateController.$inject = ['ArticleService', '$state'];

    function articleCreateController(ArticleService, $state){
        var vm = this;
        vm.article = {};
        vm.create = create;


        function create() {
          ArticleService
            .create(vm.article)
            .then(function (response) {
              vm.article = {};
              //redirect to articles

              $state.transitionTo("articles", {}, { reload: true, inherit: false, notify: true });
            })
            .catch(function (error) {

            })
            .finally(function () {
              console.log("finally");

              //$state.go('articles');
            })
        }
    }
})();
