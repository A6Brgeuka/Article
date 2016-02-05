(function() {
    'use strict';

    angular
        .module("App")
        .controller('SignUpCtrl', signUpCtrl);


    signUpCtrl.$inject = ['signService'];

    function signUpCtrl(signService){
        var suc = this;
        suc.register = register;
        suc.username = '';
        suc.password = '';

        function register(){
            signService
                .signUp(suc.username, suc.password)
                .then(function(res){
                    suc.user = res;
                    document.location.href = '#/';
                    console.log(res);
                })
                .catch(function(res){
                    alert("FATAL ERROR FROM SIGNUPCTRL");
                });
        }
    }
})();