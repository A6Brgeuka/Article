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
      'blog.blocks'
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

        function signIn(username, password){
            return $http.post('/auth/signin', {
                username : username,
                password : password
            });
        }

        function signUp(username, password){
            return $http.post('/auth/signup', {
                username : username,
                password : password
            })
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
        .controller('ArticleController', articleController);


    articleController.$inject = [];

    function articleController(){
      var vm = this;
      vm.test = "hello from articleController";
    }
})();

(function() {
    'use strict';

    angular
        .module("blog.article")
        .controller('ArticleCreateController', articleCreateController);


    articleCreateController.$inject = [];

    function articleCreateController(){
        var vm = this;

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
        vm.username = '';
        vm.password = '';

        function login(){
            signService
                .signIn(vm.username, vm.password)
                .then(function(res){
                    vm.user = res;

                    document.location.href = '/';
                })
                .catch(function(err){
                    console.log(err);
                    alert("FATAL ERROR FROM SIGNiNCTRL");
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
        vm.username = '';
        vm.password = '';

        function register(){
            signService
                .signUp(vm.username, vm.password)
                .then(function(res){
                    vm.user = res;
                    console.log("res: " + res);
                    document.location.href = '/';
                })
                .catch(function(err){
                    console.log("err: " + err);
                    //alert(err);
                });
        }
    }
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwiYmxvY2tzL2Jsb2Nrcy5tb2R1bGUuanMiLCJibG9ja3Mvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwicGFnZXMvYXJ0aWNsZS9hcnRpY2xlLm1vZHVsZS5qcyIsInBhZ2VzL2F1dGgvYXV0aC5tb2R1bGUuanMiLCJhcHAuY29uZmlnLmpzIiwiY29yZS9jb3JlLmNvbnRyb2xsZXIuanMiLCJibG9ja3Mvc2VydmljZXMvYXJ0aWNsZS5zZXJ2aWNlLmpzIiwiYmxvY2tzL3NlcnZpY2VzL2F1dGguc2VydmljZS5qcyIsInBhZ2VzL2FydGljbGUvYXJ0aWNsZS5jb25maWcuanMiLCJwYWdlcy9hdXRoL2F1dGguY29uZmlnLmpzIiwicGFnZXMvYXJ0aWNsZS9saXN0L2FydGljbGUuY29udHJvbGxlci5qcyIsInBhZ2VzL2FydGljbGUvbmV3L2NyZWF0ZS5jb250cm9sbGVyLmpzIiwicGFnZXMvYXV0aC9zaWduSW4vc2lnbkluLmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hdXRoL3NpZ25PdXQvc2lnbk91dC5jb250cm9sbGVyLmpzIiwicGFnZXMvYXV0aC9zaWduVXAvc2lnblVwLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZ1wiLCBbXHJcbiAgICAgICAgJ2Jsb2cuY29yZScsXHJcbiAgICAgICAgLy9wYWdlc1xyXG4gICAgICAgICdibG9nLmF1dGgnLFxyXG4gICAgICAgICdibG9nLmFydGljbGUnXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZy5jb3JlXCIsIFtcclxuICAgICAgJ3VpLnJvdXRlcicsXHJcbiAgICAgICdtZ2NyZWEubmdTdHJhcC5hbGVydCcsXHJcbiAgICAgICdibG9nLmJsb2NrcydcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmJsb2Nrc1wiLCBbXHJcbiAgICAgICAgXCJibG9ja3Muc2VydmljZXNcIixcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9ja3Muc2VydmljZXNcIiwgW10pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmFydGljbGVcIiwgW1xyXG4gICAgICAnYmxvZy5jb3JlJ1xyXG4gICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2cuYXV0aFwiLCBbXHJcbiAgICAgICdibG9nLmNvcmUnXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nXCIpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIGNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInIF07XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZShcImhvbWVcIiwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2hvbWUvaG9tZS5lanNcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKFwiYmxvZ1wiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdDb3JlQ29udHJvbGxlcicsIGNvcmVDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgY29yZUNvbnRyb2xsZXIuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvcmVDb250cm9sbGVyKCl7XHJcblxyXG4gICAgICAgIHZhciBjYyA9IHRoaXM7XHJcbiAgICAgICAgY2MudGVzdCA9IFwidGVzdCBmcm9tIENvcmVDb250cm9sbGVyXCJcclxuXHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIiIsIihmdW5jdGlvbigpe1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2Jsb2Nrcy5zZXJ2aWNlcycpXHJcbiAgICAgICAgLmZhY3RvcnkoJ1NpZ25TZXJ2aWNlJywgc2lnblNlcnZpY2UpO1xyXG5cclxuICAgIHNpZ25TZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25TZXJ2aWNlKCRodHRwKXtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2lnbkluIDogc2lnbkluLFxyXG4gICAgICAgICAgICBzaWduVXAgOiBzaWduVXAsXHJcbiAgICAgICAgICAgIHNpZ25PdXQgOiBzaWduT3V0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaWduSW4odXNlcm5hbWUsIHBhc3N3b3JkKXtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hdXRoL3NpZ25pbicsIHtcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lIDogdXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZCA6IHBhc3N3b3JkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2lnblVwKHVzZXJuYW1lLCBwYXNzd29yZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXV0aC9zaWdudXAnLCB7XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQgOiBwYXNzd29yZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2lnbk91dCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hdXRoL3NpZ25vdXQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvZy5hcnRpY2xlXCIpLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIGNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgIC5zdGF0ZShcImFydGljbGVzXCIsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9hcnRpY2xlc1wiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOlwiQXJ0aWNsZUNvbnRyb2xsZXIgYXMgYWNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6J2FwcC9wYWdlcy9hcnRpY2xlL2xpc3QvYXJ0aWNsZXMuZWpzJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZShcImFydGljbGVzLmNyZWF0ZVwiLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY3JlYXRlXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6XCJBcnRpY2xlQ3JlYXRlQ29udHJvbGxlciBhcyBhY2NcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6XCJhcHAvcGFnZXMvYXJ0aWNsZS9uZXcvY3JlYXRlLmVqc1wiXHJcbiAgICAgICAgICB9KTtcclxuICAgIH07XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9nLmF1dGhcIikuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgIC5zdGF0ZShcInNpZ25pblwiLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvc2lnbmluXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiU2lnbkluQ29udHJvbGxlciBhcyBzaWNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2F1dGgvc2lnbkluL3NpZ25Jbi5lanNcIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZShcInNpZ251cFwiLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvc2lnbnVwXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6XCJTaWduVXBDb250cm9sbGVyIGFzIHN1Y1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDpcImFwcC9wYWdlcy9hdXRoL3NpZ25VcC9zaWduVXAuZWpzXCJcclxuICAgICAgICAgIH0pXHJcbiAgICB9O1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmFydGljbGVcIilcclxuICAgICAgICAuY29udHJvbGxlcignQXJ0aWNsZUNvbnRyb2xsZXInLCBhcnRpY2xlQ29udHJvbGxlcik7XHJcblxyXG5cclxuICAgIGFydGljbGVDb250cm9sbGVyLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBhcnRpY2xlQ29udHJvbGxlcigpe1xyXG4gICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICB2bS50ZXN0ID0gXCJoZWxsbyBmcm9tIGFydGljbGVDb250cm9sbGVyXCI7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXJ0aWNsZVwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBcnRpY2xlQ3JlYXRlQ29udHJvbGxlcicsIGFydGljbGVDcmVhdGVDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgYXJ0aWNsZUNyZWF0ZUNvbnRyb2xsZXIuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFydGljbGVDcmVhdGVDb250cm9sbGVyKCl7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2cuYXV0aFwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdTaWduSW5Db250cm9sbGVyJywgc2lnbkluQ29udHJvbGxlcik7XHJcblxyXG4gICAgc2lnbkluQ29udHJvbGxlci4kaW5qZWN0ID0gWydTaWduU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25JbkNvbnRyb2xsZXIoc2lnblNlcnZpY2Upe1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0ubG9naW4gPSBsb2dpbjtcclxuICAgICAgICB2bS51c2VybmFtZSA9ICcnO1xyXG4gICAgICAgIHZtLnBhc3N3b3JkID0gJyc7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvZ2luKCl7XHJcbiAgICAgICAgICAgIHNpZ25TZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuc2lnbkluKHZtLnVzZXJuYW1lLCB2bS5wYXNzd29yZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHJlcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvJztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRkFUQUwgRVJST1IgRlJPTSBTSUdOaU5DVFJMXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJibG9nLmF1dGhcIilcclxuICAgICAgICAuY29udHJvbGxlcignU2lnbk91dENvbnRyb2xsZXInLCBzaWduT3V0Q29udHJvbGxlcik7XHJcblxyXG5cclxuICAgIHNpZ25PdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJ1NpZ25TZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnbk91dENvbnRyb2xsZXIoc2lnblNlcnZpY2Upe1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmxvZ291dCA9IGxvZ291dDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9nb3V0KCkge1xyXG4gICAgICAgICAgICBzaWduU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLnNpZ25PdXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy8nO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkZBVEFMIEVSUk9PT09SUlJSUlJSUlwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKFwiYmxvZy5hdXRoXCIpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ1NpZ25VcENvbnRyb2xsZXInLCBzaWduVXBDb250cm9sbGVyKTtcclxuXHJcblxyXG4gICAgc2lnblVwQ29udHJvbGxlci4kaW5qZWN0ID0gWydTaWduU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25VcENvbnRyb2xsZXIoc2lnblNlcnZpY2Upe1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0ucmVnaXN0ZXIgPSByZWdpc3RlcjtcclxuICAgICAgICB2bS51c2VybmFtZSA9ICcnO1xyXG4gICAgICAgIHZtLnBhc3N3b3JkID0gJyc7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKCl7XHJcbiAgICAgICAgICAgIHNpZ25TZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuc2lnblVwKHZtLnVzZXJuYW1lLCB2bS5wYXNzd29yZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHJlcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlczogXCIgKyByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnLyc7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
