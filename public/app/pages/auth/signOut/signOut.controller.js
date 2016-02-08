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
