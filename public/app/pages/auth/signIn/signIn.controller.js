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
