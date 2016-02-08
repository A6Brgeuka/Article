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
