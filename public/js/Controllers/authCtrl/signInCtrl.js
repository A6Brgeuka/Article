(function() {
    'use strict';

    angular
        .module("App")
        .controller('SignInCtrl', signInCtrl);


    signInCtrl.$inject = ['signService'];

    function signInCtrl(signService){
        var sic = this;
        sic.login = login;
        sic.username = '';
        sic.password = '';

        function login(){
            signService
                .signIn(sic.username, sic.password)
                .then(function(res){
                    console.log(res);
                    console.log(res.data);
                    sic.user = res;
                })
                .catch(function(err){
                    console.log(err);
                });
        }
    }
})();