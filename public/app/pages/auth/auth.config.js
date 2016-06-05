(function () {

    angular.module("blog.auth").config(config);

    config.$inject = [
      "$stateProvider",
      "$urlRouterProvider"
    ];

    function config($stateProvider) {

      $stateProvider
        // .state('auth', {
        //   abstract: true,
        //   // url: '/auth',
        //   templateUrl : '<div ui-view></div>'
        // })
        .state("signin", {
          url: "/signin",
          controller: "SignInController as sic",
          templateUrl: "app/pages/auth/signIn/signIn.ejs"
        })
        .state("signup", {
          url: "/signup",
          controller:"SignUpController as suc",
          templateUrl:"app/pages/auth/signUp/signUp.ejs"
        })
    };
})();
