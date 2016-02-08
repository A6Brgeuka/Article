(function () {

    angular
      .module("blog.article")
      .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state("articles", {
            url: "/articles",
            controller:"ArticleController as ac",
            templateUrl:'app/pages/article/list/articles.ejs'
          })
          .state("articles.create", {
            url: "/create",
            controller:"ArticleCreateController as acc",
            templateUrl:"app/pages/article/new/create.ejs"
          })
          .state("articles.details", {
            url: "/:articleId",
            controller:"ArticleDetailsController as adc",
            templateUrl:"app/pages/article/details/details.ejs"
          });
    };
})();
