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

        function signIn(user){
            return $http.post('/auth/signin', user);
        }

        function signUp(user){
            return $http.post('/auth/signup', user)
        }

        function signOut() {
            return $http.post('/auth/signout');
        }
    }

})();
