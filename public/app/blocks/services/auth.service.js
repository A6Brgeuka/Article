(function(){
    angular
        .module('blocks.services')
        .factory('SignService', signService);

    signService.$inject = ['$http'];


    function signService($http){
        var service = {
            signIn : signIn,
            signUp : signUp,
            signOut : signOut
        };

        return service;

        /////////

        function signIn(username, password){
            return $http.post('/auth/signin', {
                username : username,
                password : password
            });
        }

        function signUp(username, password){
            return $http.post('/auth/signup', {
                username : username,
                password : password
            })
        }

        function signOut() {
            return $http.post('/auth/signout');
        }
    }

})();
