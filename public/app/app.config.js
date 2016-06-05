(function(){
    'use strict';

    angular
        .module("blog")
        .config(config);

    config.$inject = [
      '$stateProvider',
      '$urlRouterProvider',
      'localStorageServiceProvider'
    ];

    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider){
        $stateProvider
          .state("home", {
              url: "",
              templateUrl: "app/pages/home/home.ejs"
          });

        $urlRouterProvider.otherwise("/");

        localStorageServiceProvider
          .setPrefix('blog');      
    }
})();
