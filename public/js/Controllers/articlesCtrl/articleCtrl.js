(function() {
    'use strict';

    angular
        .module("App")
        .controller('ArticleCtrl', articleCtrl);


    articleCtrl.$inject = [];

    function articleCtrl(){
        var ac = this;

        ac.zazaza = "zazaza";
    }
})();