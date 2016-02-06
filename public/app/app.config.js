(function(){
    'use strict';

    angular
        .module("blog")
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider' ];

    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("home", {
                url: "",
                templateUrl: "app/pages/home/home.ejs"
            });
    }
})();
