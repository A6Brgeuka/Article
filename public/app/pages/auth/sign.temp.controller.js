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
