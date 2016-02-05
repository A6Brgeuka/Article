(function(){
    angular
        .module('App')
        .factory('signService', signService);

    signService.$inject = ['$http'];


    function signService($http){
        var service = {
            signIn : signIn,
            signUp : signUp
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
    }

})();