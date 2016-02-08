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
