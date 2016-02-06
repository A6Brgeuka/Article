(function() {
    'use strict';

    angular
        .module("blog.auth")
        .controller('SignOutCtrl', signOutCtrl);


    signOutCtrl.$inject = ['signService'];

    function signOutCtrl(signService){
        var soc = this;

        soc.logout = logout;

        function logout() {
            signService
                .signOut()
                .then(function(res){
                    document.location.href = '/';
                })
                .catch(function (err) {
                    console.log(err);
                    alert("FATAL ERROOOORRRRRRRR");
                })

        }
    }
})();
