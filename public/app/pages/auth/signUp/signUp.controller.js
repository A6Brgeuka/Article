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
