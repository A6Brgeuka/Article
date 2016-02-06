(function() {
    'use strict';

    angular
        .module("blog.auth")
        .controller('SignOutController', signOutController);


    signOutController.$inject = ['SignService'];

    function signOutController(signService){
        var vm = this;

        vm.logout = logout;

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
