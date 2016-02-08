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
