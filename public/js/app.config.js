(function(){
    'use strict';

    angular
        .module("App")
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider' ];

    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "../partials/index.ejs",
                controller : "CoreCtrl",
                controllerAs : "cc"
            })
            .state("articles", {
                url: "/articles",
                templateUrl: "../partials/articles/articles.ejs",
                controller: "ArticleCtrl as ac"
            })
            .state("articles.create", {
                url: "/create",
                templateUrl:"../partials/articles/create.ejs",
                controller: "ArticleCreateCtrl as acc"
            })
            .state("signin", {
                url: "/auth/login",
                templateUrl:"../partials/auth/signin.ejs",
                controller: "SignInCtrl as sic"
            })
            .state("signup", {
                url: "/auth/register",
                templateUrl:"../partials/auth/signup.ejs",
                controller: "SignUpCtrl as suc"
            });

            /*.state('articles.id', {
                url: "/id"
            })
            .state('articles.create', {

            })
            .state('articles.edit', {

            })*/
    }
})();