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
      'blog.blocks'
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

    config.$inject = ['$stateProvider', '$urlRouterProvider' ];

    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("home", {
                url: "",
                templateUrl: "app/pages/home/home.ejs"
            });
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

    angular.module("blog.article").config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider) {

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

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider) {

        $stateProvider
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

    signInController.$inject = ['SignService'];

    function signInController(signService){
        var vm = this;
        vm.login = login;
        vm.user = {};

        function login(){
            signService
                .signIn(vm.user)
                .then(function(response){
                    vm.data = response.data;
                    document.location.href = '/';
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


    signOutController.$inject = ['SignService'];

    function signOutController(signService){
        var vm = this;

        vm.logout = logout;

        function logout() {
            signService
                .signOut()
                .then(function(res){
                    document.location.href = '/';
                })
                .catch(function (err) {
                    console.log(err);
                    alert("FATAL ERROOOORRRRRRRR");
                })

        }
    }
})();

(function() {
    'use strict';

    angular
        .module("blog.auth")
        .controller('SignUpController', signUpController);


    signUpController.$inject = ['SignService'];

    function signUpController(signService){
        var vm = this;
        vm.register = register;
        vm.user = {};

        function register(){
            signService
                .signUp(vm.user)
                .then(function(res){
                    vm.data = res.data;
                    document.location.href = '/';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJibG9ja3MvYmxvY2tzLm1vZHVsZS5qcyIsImNvcmUvY29yZS5tb2R1bGUuanMiLCJibG9ja3Mvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwicGFnZXMvYXJ0aWNsZS9hcnRpY2xlLm1vZHVsZS5qcyIsInBhZ2VzL2F1dGgvYXV0aC5tb2R1bGUuanMiLCJhcHAuY29uZmlnLmpzIiwiY29yZS9jb3JlLmNvbnRyb2xsZXIuanMiLCJibG9ja3Mvc2VydmljZXMvYXJ0aWNsZS5zZXJ2aWNlLmpzIiwiYmxvY2tzL3NlcnZpY2VzL2F1dGguc2VydmljZS5qcyIsInBhZ2VzL2FydGljbGUvYXJ0aWNsZS5jb25maWcuanMiLCJwYWdlcy9hdXRoL2F1dGguY29uZmlnLmpzIiwicGFnZXMvYXJ0aWNsZS9kZXRhaWxzL2RldGFpbHMuY29udHJvbGxlci5qcyIsInBhZ2VzL2FydGljbGUvbGlzdC9hcnRpY2xlLmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hcnRpY2xlL25ldy9jcmVhdGUuY29udHJvbGxlci5qcyIsInBhZ2VzL2F1dGgvc2lnbkluL3NpZ25Jbi5jb250cm9sbGVyLmpzIiwicGFnZXMvYXV0aC9zaWduT3V0L3NpZ25PdXQuY29udHJvbGxlci5qcyIsInBhZ2VzL2F1dGgvc2lnblVwL3NpZ25VcC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nXCIsIFtcclxuICAgICAgICAnYmxvZy5jb3JlJyxcclxuICAgICAgICAvL3BhZ2VzXHJcbiAgICAgICAgJ2Jsb2cuYXV0aCcsXHJcbiAgICAgICAgJ2Jsb2cuYXJ0aWNsZSdcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmJsb2Nrc1wiLCBbXHJcbiAgICAgICAgXCJibG9ja3Muc2VydmljZXNcIixcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmNvcmVcIiwgW1xyXG4gICAgICAndWkucm91dGVyJyxcclxuICAgICAgJ21nY3JlYS5uZ1N0cmFwLmFsZXJ0JyxcclxuICAgICAgJ2Jsb2cuYmxvY2tzJ1xyXG4gICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2Nrcy5zZXJ2aWNlc1wiLCBbXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2cuYXJ0aWNsZVwiLCBbXHJcbiAgICAgICdibG9nLmNvcmUnXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZy5hdXRoXCIsIFtcclxuICAgICAgJ2Jsb2cuY29yZSdcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2dcIilcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKFwiaG9tZVwiLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvcGFnZXMvaG9tZS9ob21lLmVqc1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nXCIpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0NvcmVDb250cm9sbGVyJywgY29yZUNvbnRyb2xsZXIpO1xyXG5cclxuXHJcbiAgICBjb3JlQ29udHJvbGxlci4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gY29yZUNvbnRyb2xsZXIoKXtcclxuXHJcbiAgICAgICAgdmFyIGNjID0gdGhpcztcclxuICAgICAgICBjYy50ZXN0ID0gXCJ0ZXN0IGZyb20gQ29yZUNvbnRyb2xsZXJcIlxyXG5cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYmxvY2tzLnNlcnZpY2VzJylcclxuICAgICAgICAuZmFjdG9yeSgnQXJ0aWNsZVNlcnZpY2UnLCBhcnRpY2xlU2VydmljZSk7XHJcblxyXG4gICAgYXJ0aWNsZVNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gYXJ0aWNsZVNlcnZpY2UoJGh0dHApe1xyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgZ2V0TGlzdCA6IGdldExpc3QsXHJcbiAgICAgICAgICBnZXQgOiBnZXQsXHJcbiAgICAgICAgICBjcmVhdGUgOiBjcmVhdGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExpc3QoKXtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FydGljbGVzLycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlKGFydGljbGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FydGljbGVzL2NyZWF0ZScsIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogYXJ0aWNsZS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGJvZHkgOiBhcnRpY2xlLmJvZHlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXQoYXJ0aWNsZUlkKSB7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXJ0aWNsZXMvZGV0YWlscy8nICsgYXJ0aWNsZUlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2Jsb2Nrcy5zZXJ2aWNlcycpXHJcbiAgICAgICAgLmZhY3RvcnkoJ1NpZ25TZXJ2aWNlJywgc2lnblNlcnZpY2UpO1xyXG5cclxuICAgIHNpZ25TZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25TZXJ2aWNlKCRodHRwKXtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2lnbkluIDogc2lnbkluLFxyXG4gICAgICAgICAgICBzaWduVXAgOiBzaWduVXAsXHJcbiAgICAgICAgICAgIHNpZ25PdXQgOiBzaWduT3V0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaWduSW4odXNlcil7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXV0aC9zaWduaW4nLCB1c2VyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNpZ25VcCh1c2VyKXtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hdXRoL3NpZ251cCcsIHVzZXIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaWduT3V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2F1dGgvc2lnbm91dCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmFydGljbGVcIikuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgLnN0YXRlKFwiYXJ0aWNsZXNcIiwge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2FydGljbGVzXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6XCJBcnRpY2xlQ29udHJvbGxlciBhcyBhY1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDonYXBwL3BhZ2VzL2FydGljbGUvbGlzdC9hcnRpY2xlcy5lanMnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKFwiYXJ0aWNsZXMuY3JlYXRlXCIsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jcmVhdGVcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjpcIkFydGljbGVDcmVhdGVDb250cm9sbGVyIGFzIGFjY1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDpcImFwcC9wYWdlcy9hcnRpY2xlL25ldy9jcmVhdGUuZWpzXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoXCJhcnRpY2xlcy5kZXRhaWxzXCIsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi86YXJ0aWNsZUlkXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6XCJBcnRpY2xlRGV0YWlsc0NvbnRyb2xsZXIgYXMgYWRjXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOlwiYXBwL3BhZ2VzL2FydGljbGUvZGV0YWlscy9kZXRhaWxzLmVqc1wiXHJcbiAgICAgICAgICB9KTtcclxuICAgIH07XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmF1dGhcIikuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgIC5zdGF0ZShcInNpZ25pblwiLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvc2lnbmluXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiU2lnbkluQ29udHJvbGxlciBhcyBzaWNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2F1dGgvc2lnbkluL3NpZ25Jbi5lanNcIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZShcInNpZ251cFwiLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvc2lnbnVwXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6XCJTaWduVXBDb250cm9sbGVyIGFzIHN1Y1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDpcImFwcC9wYWdlcy9hdXRoL3NpZ25VcC9zaWduVXAuZWpzXCJcclxuICAgICAgICAgIH0pXHJcbiAgICB9O1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmFydGljbGVcIilcclxuICAgICAgICAuY29udHJvbGxlcignQXJ0aWNsZURldGFpbHNDb250cm9sbGVyJywgYXJ0aWNsZURldGFpbHNDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgYXJ0aWNsZURldGFpbHNDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJyRzdGF0ZVBhcmFtcycsJyRzdGF0ZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFydGljbGVEZXRhaWxzQ29udHJvbGxlcihBcnRpY2xlU2VydmljZSwgJHN0YXRlUGFyYW1zLCAkc3RhdGUpe1xyXG4gICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICB2bS50ZXN0ID0gXCJoZWxsbyBmcm9tIGFydGljbGVEZXRhaWxzQ29udHJvbGxlclwiO1xyXG4gICAgICB2bS5hcnRpY2xlSWQgPSAkc3RhdGVQYXJhbXMuYXJ0aWNsZUlkO1xyXG5cclxuICAgICAgZ2V0QXJ0aWNsZSgpO1xyXG5cclxuICAgICAgZnVuY3Rpb24gZ2V0QXJ0aWNsZSgpIHtcclxuICAgICAgICBBcnRpY2xlU2VydmljZVxyXG4gICAgICAgICAgLmdldCh2bS5hcnRpY2xlSWQpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgdm0uYXJ0aWNsZSA9IHJlc3BvbnNlLmRhdGEuYXJ0aWNsZTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRkFUQUwgRVJSXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXJ0aWNsZVwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBcnRpY2xlQ29udHJvbGxlcicsIGFydGljbGVDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgYXJ0aWNsZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnQXJ0aWNsZVNlcnZpY2UnLCAnJHN0YXRlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gYXJ0aWNsZUNvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsICRzdGF0ZSl7XHJcbiAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgIHZtLnRlc3QgPSBcImhlbGxvIGZyb20gYXJ0aWNsZUNvbnRyb2xsZXJcIjtcclxuXHJcbiAgICAgIGdldEFydGljbGVzKCk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBnZXRBcnRpY2xlcygpIHtcclxuICAgICAgICBBcnRpY2xlU2VydmljZVxyXG4gICAgICAgICAgLmdldExpc3QoKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHZtLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5hcnRpY2xlcztcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRkFUQUwgRVJSXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXJ0aWNsZVwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBcnRpY2xlQ3JlYXRlQ29udHJvbGxlcicsIGFydGljbGVDcmVhdGVDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgYXJ0aWNsZUNyZWF0ZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnQXJ0aWNsZVNlcnZpY2UnLCAnJHN0YXRlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gYXJ0aWNsZUNyZWF0ZUNvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsICRzdGF0ZSl7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICB2bS5hcnRpY2xlID0ge307XHJcbiAgICAgICAgdm0uY3JlYXRlID0gY3JlYXRlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgICBBcnRpY2xlU2VydmljZVxyXG4gICAgICAgICAgICAuY3JlYXRlKHZtLmFydGljbGUpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgIHZtLmFydGljbGUgPSB7fTtcclxuICAgICAgICAgICAgICAvL3JlZGlyZWN0IHRvIGFydGljbGVzXHJcblxyXG4gICAgICAgICAgICAgICRzdGF0ZS50cmFuc2l0aW9uVG8oXCJhcnRpY2xlc1wiLCB7fSwgeyByZWxvYWQ6IHRydWUsIGluaGVyaXQ6IGZhbHNlLCBub3RpZnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsbHlcIik7XHJcblxyXG4gICAgICAgICAgICAgIC8vJHN0YXRlLmdvKCdhcnRpY2xlcycpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKFwiYmxvZy5hdXRoXCIpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ1NpZ25JbkNvbnRyb2xsZXInLCBzaWduSW5Db250cm9sbGVyKTtcclxuXHJcbiAgICBzaWduSW5Db250cm9sbGVyLiRpbmplY3QgPSBbJ1NpZ25TZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnbkluQ29udHJvbGxlcihzaWduU2VydmljZSl7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICB2bS5sb2dpbiA9IGxvZ2luO1xyXG4gICAgICAgIHZtLnVzZXIgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9naW4oKXtcclxuICAgICAgICAgICAgc2lnblNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5zaWduSW4odm0udXNlcilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgICAgICB2bS5kYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy8nO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IuZGF0YS5lcnIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbHlcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXV0aFwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdTaWduT3V0Q29udHJvbGxlcicsIHNpZ25PdXRDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgc2lnbk91dENvbnRyb2xsZXIuJGluamVjdCA9IFsnU2lnblNlcnZpY2UnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaWduT3V0Q29udHJvbGxlcihzaWduU2VydmljZSl7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0ubG9nb3V0ID0gbG9nb3V0O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XHJcbiAgICAgICAgICAgIHNpZ25TZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuc2lnbk91dCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnLyc7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRkFUQUwgRVJST09PT1JSUlJSUlJSXCIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmF1dGhcIilcclxuICAgICAgICAuY29udHJvbGxlcignU2lnblVwQ29udHJvbGxlcicsIHNpZ25VcENvbnRyb2xsZXIpO1xyXG5cclxuXHJcbiAgICBzaWduVXBDb250cm9sbGVyLiRpbmplY3QgPSBbJ1NpZ25TZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnblVwQ29udHJvbGxlcihzaWduU2VydmljZSl7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICB2bS5yZWdpc3RlciA9IHJlZ2lzdGVyO1xyXG4gICAgICAgIHZtLnVzZXIgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVnaXN0ZXIoKXtcclxuICAgICAgICAgICAgc2lnblNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5zaWduVXAodm0udXNlcilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZGF0YSA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnLyc7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5kYXRhLmVycik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFseVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
