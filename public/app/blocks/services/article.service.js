(function(){
    angular
        .module('blocks.services')
        .factory('ArticleService', articleService);

    articleService.$inject = ['$http'];


    function articleService($http){
        var service = {
          getList : getList,
          get : get,
          create : create
        };

        return service;

        /////////

        function getList(){
            return $http.get('/articles/');
        }

        function create(article){
            return $http.post('/articles/create', {
                title : article.title,
                body : article.body
            });
        }

        function get(articleId) {
          return $http.get('/articles/details/' + articleId);
        }
    }
})();
