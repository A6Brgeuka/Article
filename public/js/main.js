(function () {
    angular.module("blog", [
        'blog.core',
        //pages
        'blog.auth',
        'blog.article'
    ]);
})();

(function () {
    angular.module("blog.blocks", [
        "blocks.services",
    ]);
})();

(function () {
    angular.module("blog.core", [
      'ui.router',
      'mgcrea.ngStrap.alert',
      'blog.blocks',
      'LocalStorageModule',
      'angular-jwt',
      'textAngular'
    ]);
})();

(function () {
    angular.module("blocks.services", []);
})();

(function () {
    angular.module("blog.article", [
      'blog.core'
    ]);
})();

(function () {
    angular.module("blog.auth", [
      'blog.core'
    ]);
})();

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

(function() {
    'use strict';

    angular
        .module("blog")
        .controller('CoreController', coreController);


    coreController.$inject = [];

    function coreController(){

        var cc = this;
        cc.test = "test from CoreController"

    }
})();

(function(){
    angular
        .module('blocks.services')
        .factory('ArticleService', articleService);

    articleService.$inject = ['$http'];


    function articleService($http){
        var service = {
          getList : getList,
          get : get,
          create : create
        };

        return service;

        /////////

        function getList(){
            return $http.get('/articles/');
        }

        function create(article){
            return $http.post('/articles/', {
                title : article.title,
                body : article.body
            });
        }

        function get(articleId) {
          return $http.get('/articles/' + articleId);
        }
    }
})();

(function(){
    angular
        .module('blocks.services')
        .factory('SignService', signService);

    signService.$inject = ['$http'];


    function signService($http){
        var service = {
            signIn : signIn,
            signUp : signUp,
            signOut : signOut
        };

        return service;

        /////////

        function signIn(user){
            return $http.post('/auth/signin', user);
        }

        function signUp(user){
            return $http.post('/auth/signup', user)
        }

        function signOut() {
            return $http.post('/auth/signout');
        }
    }

})();

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

(function() {
    'use strict';

    angular
        .module("blog.auth")
        .controller('SignTempController', signTempController);


    signTempController.$inject = [
      'localStorageService',
      'jwtHelper'
    ];

    function signTempController(localStorageService, jwtHelper){
        var vm = this;

        vm.isAuth = false;
        vm.jwt = localStorageService.get('user');

        if (!vm.jwt) {
          vm.isAuth = false;
        } else {
          vm.token = localStorageService.get('user');
          vm.decodedJwt = vm.token && jwtHelper.decodeToken(vm.token);
          vm.user = vm.decodedJwt._doc;
          vm.isAuth = true;
        }
    }
})();

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

(function() {
    'use strict';

    angular
      .module("blog.auth")
      .controller('SignInController', signInController);

    signInController.$inject = [
      'SignService',
      'localStorageService',
      '$state'
    ];

    function signInController(SignService, localStorageService, $state){
      var vm = this;
      vm.login = login;
      vm.user = {};

      function login(){
        SignService
          .signIn(vm.user)
          .then(function(response){
            localStorageService.set('user', response.data.token);

            document.location.href = '/';
            // $state.transitionTo("articles", {}, {
            //   reload: true,
            //   inherit: false,
            //   notify: true
            // });
          })
          .catch(function(error){
            console.log(error.data.err);
          })
          .finally(function () {
            console.log("finaly");
          });
        }
    }
})();

(function() {
    'use strict';

    angular
      .module("blog.auth")
      .controller('SignOutController', signOutController);


    signOutController.$inject = [
      'SignService',
      'localStorageService',
      '$state'
    ];

    function signOutController(SignService, localStorageService, $state){
      var vm = this;

      vm.logout = logout;

      function logout() {
        SignService
          .signOut()
          .then(function(res){
            localStorageService.remove('user');
            document.location.href = '/';
            // $state.transitionTo("articles", {}, {
            //   reload: true,
            //   inherit: false,
            //   notify: true
            // });
          })
          .catch(function (err) {
              console.log(err);
              alert("FATAL ERROOOORRRRRRRR");
          });
      }
    }
})();

(function() {
    'use strict';

    angular
        .module("blog.auth")
        .controller('SignUpController', signUpController);


    signUpController.$inject = [
      'SignService',
      'localStorageService',
      '$state'
    ];

    function signUpController(signService, localStorageService, $state){
        var vm = this;
        vm.register = register;
        vm.user = {};

        function register(){
          signService
              .signUp(vm.user)
              .then(function(res){
                localStorageService.set('user', res.data.token);
                document.location.href = '/';
                // $state.transitionTo("articles", {}, {
                //   reload: true,
                //   inherit: false,
                //   notify: true
                // });
              })
              .catch(function(error){
                console.log(error.data.err);
              })
              .finally(function () {
                console.log("finaly");
              });
        }
    }
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJibG9ja3MvYmxvY2tzLm1vZHVsZS5qcyIsImNvcmUvY29yZS5tb2R1bGUuanMiLCJibG9ja3Mvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwicGFnZXMvYXJ0aWNsZS9hcnRpY2xlLm1vZHVsZS5qcyIsInBhZ2VzL2F1dGgvYXV0aC5tb2R1bGUuanMiLCJhcHAuY29uZmlnLmpzIiwiY29yZS9jb3JlLmNvbnRyb2xsZXIuanMiLCJibG9ja3Mvc2VydmljZXMvYXJ0aWNsZS5zZXJ2aWNlLmpzIiwiYmxvY2tzL3NlcnZpY2VzL2F1dGguc2VydmljZS5qcyIsInBhZ2VzL2FydGljbGUvYXJ0aWNsZS5jb25maWcuanMiLCJwYWdlcy9hdXRoL2F1dGguY29uZmlnLmpzIiwicGFnZXMvYXV0aC9zaWduLnRlbXAuY29udHJvbGxlci5qcyIsInBhZ2VzL2FydGljbGUvZGV0YWlscy9kZXRhaWxzLmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hcnRpY2xlL2xpc3QvYXJ0aWNsZS5jb250cm9sbGVyLmpzIiwicGFnZXMvYXJ0aWNsZS9uZXcvY3JlYXRlLmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hdXRoL3NpZ25Jbi9zaWduSW4uY29udHJvbGxlci5qcyIsInBhZ2VzL2F1dGgvc2lnbk91dC9zaWduT3V0LmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hdXRoL3NpZ25VcC9zaWduVXAuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2dcIiwgW1xyXG4gICAgICAgICdibG9nLmNvcmUnLFxyXG4gICAgICAgIC8vcGFnZXNcclxuICAgICAgICAnYmxvZy5hdXRoJyxcclxuICAgICAgICAnYmxvZy5hcnRpY2xlJ1xyXG4gICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2cuYmxvY2tzXCIsIFtcclxuICAgICAgICBcImJsb2Nrcy5zZXJ2aWNlc1wiLFxyXG4gICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2cuY29yZVwiLCBbXHJcbiAgICAgICd1aS5yb3V0ZXInLFxyXG4gICAgICAnbWdjcmVhLm5nU3RyYXAuYWxlcnQnLFxyXG4gICAgICAnYmxvZy5ibG9ja3MnLFxyXG4gICAgICAnTG9jYWxTdG9yYWdlTW9kdWxlJyxcclxuICAgICAgJ2FuZ3VsYXItand0JyxcclxuICAgICAgJ3RleHRBbmd1bGFyJ1xyXG4gICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2Nrcy5zZXJ2aWNlc1wiLCBbXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2cuYXJ0aWNsZVwiLCBbXHJcbiAgICAgICdibG9nLmNvcmUnXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZy5hdXRoXCIsIFtcclxuICAgICAgJ2Jsb2cuY29yZSdcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2dcIilcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbXHJcbiAgICAgICckc3RhdGVQcm92aWRlcicsXHJcbiAgICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxyXG4gICAgICAnbG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyJ1xyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgbG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyKXtcclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgLnN0YXRlKFwiaG9tZVwiLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiBcIlwiLFxyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9wYWdlcy9ob21lL2hvbWUuZWpzXCJcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL1wiKTtcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyXHJcbiAgICAgICAgICAuc2V0UHJlZml4KCdibG9nJyk7ICAgICAgXHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2dcIilcclxuICAgICAgICAuY29udHJvbGxlcignQ29yZUNvbnRyb2xsZXInLCBjb3JlQ29udHJvbGxlcik7XHJcblxyXG5cclxuICAgIGNvcmVDb250cm9sbGVyLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb3JlQ29udHJvbGxlcigpe1xyXG5cclxuICAgICAgICB2YXIgY2MgPSB0aGlzO1xyXG4gICAgICAgIGNjLnRlc3QgPSBcInRlc3QgZnJvbSBDb3JlQ29udHJvbGxlclwiXHJcblxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdibG9ja3Muc2VydmljZXMnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdBcnRpY2xlU2VydmljZScsIGFydGljbGVTZXJ2aWNlKTtcclxuXHJcbiAgICBhcnRpY2xlU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBhcnRpY2xlU2VydmljZSgkaHR0cCl7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICBnZXRMaXN0IDogZ2V0TGlzdCxcclxuICAgICAgICAgIGdldCA6IGdldCxcclxuICAgICAgICAgIGNyZWF0ZSA6IGNyZWF0ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvLy8vLy8vLy9cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGlzdCgpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXJ0aWNsZXMvJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUoYXJ0aWNsZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXJ0aWNsZXMvJywge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgOiBhcnRpY2xlLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYm9keSA6IGFydGljbGUuYm9keVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldChhcnRpY2xlSWQpIHtcclxuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcnRpY2xlcy8nICsgYXJ0aWNsZUlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2Jsb2Nrcy5zZXJ2aWNlcycpXHJcbiAgICAgICAgLmZhY3RvcnkoJ1NpZ25TZXJ2aWNlJywgc2lnblNlcnZpY2UpO1xyXG5cclxuICAgIHNpZ25TZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25TZXJ2aWNlKCRodHRwKXtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2lnbkluIDogc2lnbkluLFxyXG4gICAgICAgICAgICBzaWduVXAgOiBzaWduVXAsXHJcbiAgICAgICAgICAgIHNpZ25PdXQgOiBzaWduT3V0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaWduSW4odXNlcil7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXV0aC9zaWduaW4nLCB1c2VyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNpZ25VcCh1c2VyKXtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hdXRoL3NpZ251cCcsIHVzZXIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaWduT3V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2F1dGgvc2lnbm91dCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAubW9kdWxlKFwiYmxvZy5hcnRpY2xlXCIpXHJcbiAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBjb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgIC5zdGF0ZShcImFydGljbGVzXCIsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9hcnRpY2xlc1wiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOlwiQXJ0aWNsZUNvbnRyb2xsZXIgYXMgYWNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6J2FwcC9wYWdlcy9hcnRpY2xlL2xpc3QvYXJ0aWNsZXMuZWpzJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZShcImFydGljbGVzLmNyZWF0ZVwiLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY3JlYXRlXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6XCJBcnRpY2xlQ3JlYXRlQ29udHJvbGxlciBhcyBhY2NcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6XCJhcHAvcGFnZXMvYXJ0aWNsZS9uZXcvY3JlYXRlLmVqc1wiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKFwiYXJ0aWNsZXMuZGV0YWlsc1wiLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvOmFydGljbGVJZFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOlwiQXJ0aWNsZURldGFpbHNDb250cm9sbGVyIGFzIGFkY1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDpcImFwcC9wYWdlcy9hcnRpY2xlL2RldGFpbHMvZGV0YWlscy5lanNcIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZy5hdXRoXCIpLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIGNvbmZpZy4kaW5qZWN0ID0gW1xyXG4gICAgICBcIiRzdGF0ZVByb3ZpZGVyXCIsXHJcbiAgICAgIFwiJHVybFJvdXRlclByb3ZpZGVyXCJcclxuICAgIF07XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblxyXG4gICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC8vIC5zdGF0ZSgnYXV0aCcsIHtcclxuICAgICAgICAvLyAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgIC8vICAgLy8gdXJsOiAnL2F1dGgnLFxyXG4gICAgICAgIC8vICAgdGVtcGxhdGVVcmwgOiAnPGRpdiB1aS12aWV3PjwvZGl2PidcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIC5zdGF0ZShcInNpZ25pblwiLCB7XHJcbiAgICAgICAgICB1cmw6IFwiL3NpZ25pblwiLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogXCJTaWduSW5Db250cm9sbGVyIGFzIHNpY1wiLFxyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2F1dGgvc2lnbkluL3NpZ25Jbi5lanNcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKFwic2lnbnVwXCIsIHtcclxuICAgICAgICAgIHVybDogXCIvc2lnbnVwXCIsXHJcbiAgICAgICAgICBjb250cm9sbGVyOlwiU2lnblVwQ29udHJvbGxlciBhcyBzdWNcIixcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOlwiYXBwL3BhZ2VzL2F1dGgvc2lnblVwL3NpZ25VcC5lanNcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmF1dGhcIilcclxuICAgICAgICAuY29udHJvbGxlcignU2lnblRlbXBDb250cm9sbGVyJywgc2lnblRlbXBDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgc2lnblRlbXBDb250cm9sbGVyLiRpbmplY3QgPSBbXHJcbiAgICAgICdsb2NhbFN0b3JhZ2VTZXJ2aWNlJyxcclxuICAgICAgJ2p3dEhlbHBlcidcclxuICAgIF07XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnblRlbXBDb250cm9sbGVyKGxvY2FsU3RvcmFnZVNlcnZpY2UsIGp3dEhlbHBlcil7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0uaXNBdXRoID0gZmFsc2U7XHJcbiAgICAgICAgdm0uand0ID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3VzZXInKTtcclxuXHJcbiAgICAgICAgaWYgKCF2bS5qd3QpIHtcclxuICAgICAgICAgIHZtLmlzQXV0aCA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2bS50b2tlbiA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCd1c2VyJyk7XHJcbiAgICAgICAgICB2bS5kZWNvZGVkSnd0ID0gdm0udG9rZW4gJiYgand0SGVscGVyLmRlY29kZVRva2VuKHZtLnRva2VuKTtcclxuICAgICAgICAgIHZtLnVzZXIgPSB2bS5kZWNvZGVkSnd0Ll9kb2M7XHJcbiAgICAgICAgICB2bS5pc0F1dGggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKFwiYmxvZy5hcnRpY2xlXCIpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FydGljbGVEZXRhaWxzQ29udHJvbGxlcicsIGFydGljbGVEZXRhaWxzQ29udHJvbGxlcik7XHJcblxyXG5cclxuICAgIGFydGljbGVEZXRhaWxzQ29udHJvbGxlci4kaW5qZWN0ID0gWydBcnRpY2xlU2VydmljZScsICckc3RhdGVQYXJhbXMnLCckc3RhdGUnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBhcnRpY2xlRGV0YWlsc0NvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgJHN0YXRlKXtcclxuICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgdm0udGVzdCA9IFwiaGVsbG8gZnJvbSBhcnRpY2xlRGV0YWlsc0NvbnRyb2xsZXJcIjtcclxuICAgICAgdm0uYXJ0aWNsZUlkID0gJHN0YXRlUGFyYW1zLmFydGljbGVJZDtcclxuXHJcbiAgICAgIGdldEFydGljbGUoKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGdldEFydGljbGUoKSB7XHJcbiAgICAgICAgQXJ0aWNsZVNlcnZpY2VcclxuICAgICAgICAgIC5nZXQodm0uYXJ0aWNsZUlkKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHZtLmFydGljbGUgPSByZXNwb25zZS5kYXRhLmFydGljbGU7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZBVEFMIEVSUlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmFydGljbGVcIilcclxuICAgICAgICAuY29udHJvbGxlcignQXJ0aWNsZUNvbnRyb2xsZXInLCBhcnRpY2xlQ29udHJvbGxlcik7XHJcblxyXG5cclxuICAgIGFydGljbGVDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJyRzdGF0ZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFydGljbGVDb250cm9sbGVyKEFydGljbGVTZXJ2aWNlLCAkc3RhdGUpe1xyXG4gICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICB2bS50ZXN0ID0gXCJoZWxsbyBmcm9tIGFydGljbGVDb250cm9sbGVyXCI7XHJcblxyXG4gICAgICBnZXRBcnRpY2xlcygpO1xyXG5cclxuICAgICAgZnVuY3Rpb24gZ2V0QXJ0aWNsZXMoKSB7XHJcbiAgICAgICAgQXJ0aWNsZVNlcnZpY2VcclxuICAgICAgICAgIC5nZXRMaXN0KClcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICB2bS5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEuYXJ0aWNsZXM7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZBVEFMIEVSUlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmFydGljbGVcIilcclxuICAgICAgICAuY29udHJvbGxlcignQXJ0aWNsZUNyZWF0ZUNvbnRyb2xsZXInLCBhcnRpY2xlQ3JlYXRlQ29udHJvbGxlcik7XHJcblxyXG5cclxuICAgIGFydGljbGVDcmVhdGVDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJyRzdGF0ZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFydGljbGVDcmVhdGVDb250cm9sbGVyKEFydGljbGVTZXJ2aWNlLCAkc3RhdGUpe1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0uYXJ0aWNsZSA9IHt9O1xyXG4gICAgICAgIHZtLmNyZWF0ZSA9IGNyZWF0ZTtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgICAgICAgIEFydGljbGVTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5jcmVhdGUodm0uYXJ0aWNsZSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgdm0uYXJ0aWNsZSA9IHt9O1xyXG4gICAgICAgICAgICAgIC8vcmVkaXJlY3QgdG8gYXJ0aWNsZXNcclxuXHJcbiAgICAgICAgICAgICAgJHN0YXRlLnRyYW5zaXRpb25UbyhcImFydGljbGVzXCIsIHt9LCB7IHJlbG9hZDogdHJ1ZSwgaW5oZXJpdDogZmFsc2UsIG5vdGlmeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluYWxseVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8kc3RhdGUuZ28oJ2FydGljbGVzJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAubW9kdWxlKFwiYmxvZy5hdXRoXCIpXHJcbiAgICAgIC5jb250cm9sbGVyKCdTaWduSW5Db250cm9sbGVyJywgc2lnbkluQ29udHJvbGxlcik7XHJcblxyXG4gICAgc2lnbkluQ29udHJvbGxlci4kaW5qZWN0ID0gW1xyXG4gICAgICAnU2lnblNlcnZpY2UnLFxyXG4gICAgICAnbG9jYWxTdG9yYWdlU2VydmljZScsXHJcbiAgICAgICckc3RhdGUnXHJcbiAgICBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25JbkNvbnRyb2xsZXIoU2lnblNlcnZpY2UsIGxvY2FsU3RvcmFnZVNlcnZpY2UsICRzdGF0ZSl7XHJcbiAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgIHZtLmxvZ2luID0gbG9naW47XHJcbiAgICAgIHZtLnVzZXIgPSB7fTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGxvZ2luKCl7XHJcbiAgICAgICAgU2lnblNlcnZpY2VcclxuICAgICAgICAgIC5zaWduSW4odm0udXNlcilcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3VzZXInLCByZXNwb25zZS5kYXRhLnRva2VuKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnLyc7XHJcbiAgICAgICAgICAgIC8vICRzdGF0ZS50cmFuc2l0aW9uVG8oXCJhcnRpY2xlc1wiLCB7fSwge1xyXG4gICAgICAgICAgICAvLyAgIHJlbG9hZDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICBpbmhlcml0OiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICBub3RpZnk6IHRydWVcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IuZGF0YS5lcnIpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbHlcIik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgIC5tb2R1bGUoXCJibG9nLmF1dGhcIilcclxuICAgICAgLmNvbnRyb2xsZXIoJ1NpZ25PdXRDb250cm9sbGVyJywgc2lnbk91dENvbnRyb2xsZXIpO1xyXG5cclxuXHJcbiAgICBzaWduT3V0Q29udHJvbGxlci4kaW5qZWN0ID0gW1xyXG4gICAgICAnU2lnblNlcnZpY2UnLFxyXG4gICAgICAnbG9jYWxTdG9yYWdlU2VydmljZScsXHJcbiAgICAgICckc3RhdGUnXHJcbiAgICBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25PdXRDb250cm9sbGVyKFNpZ25TZXJ2aWNlLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkc3RhdGUpe1xyXG4gICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgdm0ubG9nb3V0ID0gbG9nb3V0O1xyXG5cclxuICAgICAgZnVuY3Rpb24gbG9nb3V0KCkge1xyXG4gICAgICAgIFNpZ25TZXJ2aWNlXHJcbiAgICAgICAgICAuc2lnbk91dCgpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgndXNlcicpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy8nO1xyXG4gICAgICAgICAgICAvLyAkc3RhdGUudHJhbnNpdGlvblRvKFwiYXJ0aWNsZXNcIiwge30sIHtcclxuICAgICAgICAgICAgLy8gICByZWxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgaW5oZXJpdDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgbm90aWZ5OiB0cnVlXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBhbGVydChcIkZBVEFMIEVSUk9PT09SUlJSUlJSUlwiKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXV0aFwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdTaWduVXBDb250cm9sbGVyJywgc2lnblVwQ29udHJvbGxlcik7XHJcblxyXG5cclxuICAgIHNpZ25VcENvbnRyb2xsZXIuJGluamVjdCA9IFtcclxuICAgICAgJ1NpZ25TZXJ2aWNlJyxcclxuICAgICAgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLFxyXG4gICAgICAnJHN0YXRlJ1xyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaWduVXBDb250cm9sbGVyKHNpZ25TZXJ2aWNlLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkc3RhdGUpe1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0ucmVnaXN0ZXIgPSByZWdpc3RlcjtcclxuICAgICAgICB2bS51c2VyID0ge307XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKCl7XHJcbiAgICAgICAgICBzaWduU2VydmljZVxyXG4gICAgICAgICAgICAgIC5zaWduVXAodm0udXNlcilcclxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3VzZXInLCByZXMuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy8nO1xyXG4gICAgICAgICAgICAgICAgLy8gJHN0YXRlLnRyYW5zaXRpb25UbyhcImFydGljbGVzXCIsIHt9LCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgIHJlbG9hZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgaW5oZXJpdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgIG5vdGlmeTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IuZGF0YS5lcnIpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbHlcIik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
