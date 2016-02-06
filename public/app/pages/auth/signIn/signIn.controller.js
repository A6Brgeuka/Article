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
