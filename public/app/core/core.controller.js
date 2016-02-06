(function() {
    'use strict';

    angular
        .module("blog")
        .controller('CoreController', coreController);


    coreController.$inject = [];

    function coreController(){

        var cc = this;
        cc.test = "test from CoreController"

    }
})();
