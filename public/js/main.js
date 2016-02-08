(function () {
    angular.module("blog", [
        'blog.core',
        //pages
        'blog.auth',
        'blog.article'
    ]);
})();

(function () {
    angular.module("blog.core", [
      'ui.router',
      'mgcrea.ngStrap.alert',
      'blog.blocks',
      'LocalStorageModule',
      'angular-jwt'
    ]);
})();

(function () {
    angular.module("blog.blocks", [
        "blocks.services",
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
            return $http.post('/articles/create', {
                title : article.title,
                body : article.body
            });
        }

        function get(articleId) {
          return $http.get('/articles/details/' + articleId);
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
        .state('auth', {
          abstract: true,
          url: '/auth',
          templateUrl : '<ui-view/>'
        })
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwiYmxvY2tzL2Jsb2Nrcy5tb2R1bGUuanMiLCJibG9ja3Mvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwicGFnZXMvYXJ0aWNsZS9hcnRpY2xlLm1vZHVsZS5qcyIsInBhZ2VzL2F1dGgvYXV0aC5tb2R1bGUuanMiLCJhcHAuY29uZmlnLmpzIiwiY29yZS9jb3JlLmNvbnRyb2xsZXIuanMiLCJibG9ja3Mvc2VydmljZXMvYXJ0aWNsZS5zZXJ2aWNlLmpzIiwiYmxvY2tzL3NlcnZpY2VzL2F1dGguc2VydmljZS5qcyIsInBhZ2VzL2FydGljbGUvYXJ0aWNsZS5jb25maWcuanMiLCJwYWdlcy9hdXRoL2F1dGguY29uZmlnLmpzIiwicGFnZXMvYXV0aC9zaWduLnRlbXAuY29udHJvbGxlci5qcyIsInBhZ2VzL2FydGljbGUvZGV0YWlscy9kZXRhaWxzLmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hcnRpY2xlL2xpc3QvYXJ0aWNsZS5jb250cm9sbGVyLmpzIiwicGFnZXMvYXJ0aWNsZS9uZXcvY3JlYXRlLmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hdXRoL3NpZ25Jbi9zaWduSW4uY29udHJvbGxlci5qcyIsInBhZ2VzL2F1dGgvc2lnbk91dC9zaWduT3V0LmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hdXRoL3NpZ25VcC9zaWduVXAuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZ1wiLCBbXHJcbiAgICAgICAgJ2Jsb2cuY29yZScsXHJcbiAgICAgICAgLy9wYWdlc1xyXG4gICAgICAgICdibG9nLmF1dGgnLFxyXG4gICAgICAgICdibG9nLmFydGljbGUnXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZy5jb3JlXCIsIFtcclxuICAgICAgJ3VpLnJvdXRlcicsXHJcbiAgICAgICdtZ2NyZWEubmdTdHJhcC5hbGVydCcsXHJcbiAgICAgICdibG9nLmJsb2NrcycsXHJcbiAgICAgICdMb2NhbFN0b3JhZ2VNb2R1bGUnLFxyXG4gICAgICAnYW5ndWxhci1qd3QnXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZy5ibG9ja3NcIiwgW1xyXG4gICAgICAgIFwiYmxvY2tzLnNlcnZpY2VzXCIsXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvY2tzLnNlcnZpY2VzXCIsIFtdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZy5hcnRpY2xlXCIsIFtcclxuICAgICAgJ2Jsb2cuY29yZSdcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmF1dGhcIiwgW1xyXG4gICAgICAnYmxvZy5jb3JlJ1xyXG4gICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKFwiYmxvZ1wiKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBjb25maWcuJGluamVjdCA9IFtcclxuICAgICAgJyRzdGF0ZVByb3ZpZGVyJyxcclxuICAgICAgJyR1cmxSb3V0ZXJQcm92aWRlcicsXHJcbiAgICAgICdsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXInXHJcbiAgICBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIpe1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAuc3RhdGUoXCJob21lXCIsIHtcclxuICAgICAgICAgICAgICB1cmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2hvbWUvaG9tZS5lanNcIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyXHJcbiAgICAgICAgICAuc2V0UHJlZml4KCdibG9nJyk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2dcIilcclxuICAgICAgICAuY29udHJvbGxlcignQ29yZUNvbnRyb2xsZXInLCBjb3JlQ29udHJvbGxlcik7XHJcblxyXG5cclxuICAgIGNvcmVDb250cm9sbGVyLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb3JlQ29udHJvbGxlcigpe1xyXG5cclxuICAgICAgICB2YXIgY2MgPSB0aGlzO1xyXG4gICAgICAgIGNjLnRlc3QgPSBcInRlc3QgZnJvbSBDb3JlQ29udHJvbGxlclwiXHJcblxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdibG9ja3Muc2VydmljZXMnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdBcnRpY2xlU2VydmljZScsIGFydGljbGVTZXJ2aWNlKTtcclxuXHJcbiAgICBhcnRpY2xlU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBhcnRpY2xlU2VydmljZSgkaHR0cCl7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICBnZXRMaXN0IDogZ2V0TGlzdCxcclxuICAgICAgICAgIGdldCA6IGdldCxcclxuICAgICAgICAgIGNyZWF0ZSA6IGNyZWF0ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvLy8vLy8vLy9cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGlzdCgpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXJ0aWNsZXMvJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUoYXJ0aWNsZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXJ0aWNsZXMvY3JlYXRlJywge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgOiBhcnRpY2xlLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYm9keSA6IGFydGljbGUuYm9keVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldChhcnRpY2xlSWQpIHtcclxuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcnRpY2xlcy9kZXRhaWxzLycgKyBhcnRpY2xlSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYmxvY2tzLnNlcnZpY2VzJylcclxuICAgICAgICAuZmFjdG9yeSgnU2lnblNlcnZpY2UnLCBzaWduU2VydmljZSk7XHJcblxyXG4gICAgc2lnblNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gc2lnblNlcnZpY2UoJGh0dHApe1xyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBzaWduSW4gOiBzaWduSW4sXHJcbiAgICAgICAgICAgIHNpZ25VcCA6IHNpZ25VcCxcclxuICAgICAgICAgICAgc2lnbk91dCA6IHNpZ25PdXRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNpZ25Jbih1c2VyKXtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hdXRoL3NpZ25pbicsIHVzZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2lnblVwKHVzZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2F1dGgvc2lnbnVwJywgdXNlcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNpZ25PdXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXV0aC9zaWdub3V0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgIC5tb2R1bGUoXCJibG9nLmFydGljbGVcIilcclxuICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIGNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgLnN0YXRlKFwiYXJ0aWNsZXNcIiwge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2FydGljbGVzXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6XCJBcnRpY2xlQ29udHJvbGxlciBhcyBhY1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDonYXBwL3BhZ2VzL2FydGljbGUvbGlzdC9hcnRpY2xlcy5lanMnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKFwiYXJ0aWNsZXMuY3JlYXRlXCIsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jcmVhdGVcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjpcIkFydGljbGVDcmVhdGVDb250cm9sbGVyIGFzIGFjY1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDpcImFwcC9wYWdlcy9hcnRpY2xlL25ldy9jcmVhdGUuZWpzXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoXCJhcnRpY2xlcy5kZXRhaWxzXCIsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi86YXJ0aWNsZUlkXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6XCJBcnRpY2xlRGV0YWlsc0NvbnRyb2xsZXIgYXMgYWRjXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOlwiYXBwL3BhZ2VzL2FydGljbGUvZGV0YWlscy9kZXRhaWxzLmVqc1wiXHJcbiAgICAgICAgICB9KTtcclxuICAgIH07XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmF1dGhcIikuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbXHJcbiAgICAgIFwiJHN0YXRlUHJvdmlkZXJcIixcclxuICAgICAgXCIkdXJsUm91dGVyUHJvdmlkZXJcIlxyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCdhdXRoJywge1xyXG4gICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICB1cmw6ICcvYXV0aCcsXHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybCA6ICc8dWktdmlldy8+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKFwic2lnbmluXCIsIHtcclxuICAgICAgICAgIHVybDogXCIvc2lnbmluXCIsXHJcbiAgICAgICAgICBjb250cm9sbGVyOiBcIlNpZ25JbkNvbnRyb2xsZXIgYXMgc2ljXCIsXHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvcGFnZXMvYXV0aC9zaWduSW4vc2lnbkluLmVqc1wiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoXCJzaWdudXBcIiwge1xyXG4gICAgICAgICAgdXJsOiBcIi9zaWdudXBcIixcclxuICAgICAgICAgIGNvbnRyb2xsZXI6XCJTaWduVXBDb250cm9sbGVyIGFzIHN1Y1wiLFxyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6XCJhcHAvcGFnZXMvYXV0aC9zaWduVXAvc2lnblVwLmVqc1wiXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXV0aFwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdTaWduVGVtcENvbnRyb2xsZXInLCBzaWduVGVtcENvbnRyb2xsZXIpO1xyXG5cclxuXHJcbiAgICBzaWduVGVtcENvbnRyb2xsZXIuJGluamVjdCA9IFtcclxuICAgICAgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLFxyXG4gICAgICAnand0SGVscGVyJ1xyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaWduVGVtcENvbnRyb2xsZXIobG9jYWxTdG9yYWdlU2VydmljZSwgand0SGVscGVyKXtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5pc0F1dGggPSBmYWxzZTtcclxuICAgICAgICB2bS5qd3QgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgndXNlcicpO1xyXG5cclxuICAgICAgICBpZiAoIXZtLmp3dCkge1xyXG4gICAgICAgICAgdm0uaXNBdXRoID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZtLnRva2VuID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3VzZXInKTtcclxuICAgICAgICAgIHZtLmRlY29kZWRKd3QgPSB2bS50b2tlbiAmJiBqd3RIZWxwZXIuZGVjb2RlVG9rZW4odm0udG9rZW4pO1xyXG4gICAgICAgICAgdm0udXNlciA9IHZtLmRlY29kZWRKd3QuX2RvYztcclxuICAgICAgICAgIHZtLmlzQXV0aCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmFydGljbGVcIilcclxuICAgICAgICAuY29udHJvbGxlcignQXJ0aWNsZURldGFpbHNDb250cm9sbGVyJywgYXJ0aWNsZURldGFpbHNDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgYXJ0aWNsZURldGFpbHNDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJyRzdGF0ZVBhcmFtcycsJyRzdGF0ZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFydGljbGVEZXRhaWxzQ29udHJvbGxlcihBcnRpY2xlU2VydmljZSwgJHN0YXRlUGFyYW1zLCAkc3RhdGUpe1xyXG4gICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICB2bS50ZXN0ID0gXCJoZWxsbyBmcm9tIGFydGljbGVEZXRhaWxzQ29udHJvbGxlclwiO1xyXG4gICAgICB2bS5hcnRpY2xlSWQgPSAkc3RhdGVQYXJhbXMuYXJ0aWNsZUlkO1xyXG5cclxuICAgICAgZ2V0QXJ0aWNsZSgpO1xyXG5cclxuICAgICAgZnVuY3Rpb24gZ2V0QXJ0aWNsZSgpIHtcclxuICAgICAgICBBcnRpY2xlU2VydmljZVxyXG4gICAgICAgICAgLmdldCh2bS5hcnRpY2xlSWQpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgdm0uYXJ0aWNsZSA9IHJlc3BvbnNlLmRhdGEuYXJ0aWNsZTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRkFUQUwgRVJSXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXJ0aWNsZVwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBcnRpY2xlQ29udHJvbGxlcicsIGFydGljbGVDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgYXJ0aWNsZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnQXJ0aWNsZVNlcnZpY2UnLCAnJHN0YXRlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gYXJ0aWNsZUNvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsICRzdGF0ZSl7XHJcbiAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgIHZtLnRlc3QgPSBcImhlbGxvIGZyb20gYXJ0aWNsZUNvbnRyb2xsZXJcIjtcclxuXHJcbiAgICAgIGdldEFydGljbGVzKCk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBnZXRBcnRpY2xlcygpIHtcclxuICAgICAgICBBcnRpY2xlU2VydmljZVxyXG4gICAgICAgICAgLmdldExpc3QoKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHZtLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5hcnRpY2xlcztcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRkFUQUwgRVJSXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXJ0aWNsZVwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBcnRpY2xlQ3JlYXRlQ29udHJvbGxlcicsIGFydGljbGVDcmVhdGVDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgYXJ0aWNsZUNyZWF0ZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnQXJ0aWNsZVNlcnZpY2UnLCAnJHN0YXRlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gYXJ0aWNsZUNyZWF0ZUNvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsICRzdGF0ZSl7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICB2bS5hcnRpY2xlID0ge307XHJcbiAgICAgICAgdm0uY3JlYXRlID0gY3JlYXRlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgICBBcnRpY2xlU2VydmljZVxyXG4gICAgICAgICAgICAuY3JlYXRlKHZtLmFydGljbGUpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgIHZtLmFydGljbGUgPSB7fTtcclxuICAgICAgICAgICAgICAvL3JlZGlyZWN0IHRvIGFydGljbGVzXHJcblxyXG4gICAgICAgICAgICAgICRzdGF0ZS50cmFuc2l0aW9uVG8oXCJhcnRpY2xlc1wiLCB7fSwgeyByZWxvYWQ6IHRydWUsIGluaGVyaXQ6IGZhbHNlLCBub3RpZnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsbHlcIik7XHJcblxyXG4gICAgICAgICAgICAgIC8vJHN0YXRlLmdvKCdhcnRpY2xlcycpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgLm1vZHVsZShcImJsb2cuYXV0aFwiKVxyXG4gICAgICAuY29udHJvbGxlcignU2lnbkluQ29udHJvbGxlcicsIHNpZ25JbkNvbnRyb2xsZXIpO1xyXG5cclxuICAgIHNpZ25JbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcclxuICAgICAgJ1NpZ25TZXJ2aWNlJyxcclxuICAgICAgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLFxyXG4gICAgICAnJHN0YXRlJ1xyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaWduSW5Db250cm9sbGVyKFNpZ25TZXJ2aWNlLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkc3RhdGUpe1xyXG4gICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICB2bS5sb2dpbiA9IGxvZ2luO1xyXG4gICAgICB2bS51c2VyID0ge307XHJcblxyXG4gICAgICBmdW5jdGlvbiBsb2dpbigpe1xyXG4gICAgICAgIFNpZ25TZXJ2aWNlXHJcbiAgICAgICAgICAuc2lnbkluKHZtLnVzZXIpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCd1c2VyJywgcmVzcG9uc2UuZGF0YS50b2tlbik7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy8nO1xyXG4gICAgICAgICAgICAvLyAkc3RhdGUudHJhbnNpdGlvblRvKFwiYXJ0aWNsZXNcIiwge30sIHtcclxuICAgICAgICAgICAgLy8gICByZWxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgaW5oZXJpdDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgbm90aWZ5OiB0cnVlXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLmRhdGEuZXJyKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluYWx5XCIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAubW9kdWxlKFwiYmxvZy5hdXRoXCIpXHJcbiAgICAgIC5jb250cm9sbGVyKCdTaWduT3V0Q29udHJvbGxlcicsIHNpZ25PdXRDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgc2lnbk91dENvbnRyb2xsZXIuJGluamVjdCA9IFtcclxuICAgICAgJ1NpZ25TZXJ2aWNlJyxcclxuICAgICAgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLFxyXG4gICAgICAnJHN0YXRlJ1xyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaWduT3V0Q29udHJvbGxlcihTaWduU2VydmljZSwgbG9jYWxTdG9yYWdlU2VydmljZSwgJHN0YXRlKXtcclxuICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgIHZtLmxvZ291dCA9IGxvZ291dDtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICAgICAgICBTaWduU2VydmljZVxyXG4gICAgICAgICAgLnNpZ25PdXQoKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoJ3VzZXInKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvJztcclxuICAgICAgICAgICAgLy8gJHN0YXRlLnRyYW5zaXRpb25UbyhcImFydGljbGVzXCIsIHt9LCB7XHJcbiAgICAgICAgICAgIC8vICAgcmVsb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgIGluaGVyaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgIG5vdGlmeTogdHJ1ZVxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCJGQVRBTCBFUlJPT09PUlJSUlJSUlJcIik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmF1dGhcIilcclxuICAgICAgICAuY29udHJvbGxlcignU2lnblVwQ29udHJvbGxlcicsIHNpZ25VcENvbnRyb2xsZXIpO1xyXG5cclxuXHJcbiAgICBzaWduVXBDb250cm9sbGVyLiRpbmplY3QgPSBbXHJcbiAgICAgICdTaWduU2VydmljZScsXHJcbiAgICAgICdsb2NhbFN0b3JhZ2VTZXJ2aWNlJyxcclxuICAgICAgJyRzdGF0ZSdcclxuICAgIF07XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnblVwQ29udHJvbGxlcihzaWduU2VydmljZSwgbG9jYWxTdG9yYWdlU2VydmljZSwgJHN0YXRlKXtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgIHZtLnJlZ2lzdGVyID0gcmVnaXN0ZXI7XHJcbiAgICAgICAgdm0udXNlciA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWdpc3Rlcigpe1xyXG4gICAgICAgICAgICBzaWduU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLnNpZ25VcCh2bS51c2VyKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3VzZXInLCByZXNwb25zZS5kYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvJztcclxuICAgICAgICAgICAgICAgICAgLy8gJHN0YXRlLnRyYW5zaXRpb25UbyhcImFydGljbGVzXCIsIHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgIC8vICAgcmVsb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAvLyAgIGluaGVyaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAvLyAgIG5vdGlmeTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5kYXRhLmVycik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFseVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
