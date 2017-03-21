//pageData.service
angular.module('cowApp').service('pageData', ['$http', 'authentication', function($http, authentication){

    var getAllPages = function(){
      return $http.get('/api/pages',{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };


    var getPageById = function (pageId) {
      return $http.get('/api/getPageById', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        },
        params: {
            "pageId": pageId
        }
      });
    };

    var getIndexPage = function(){
      return $http.get('/api/getIndexPage');
    };

    var getPageByPath = function(pagePath){
      return $http.get('/api/getPageByPath', {
        params: {
            "pagePath": pagePath
        }
      });
    };

    var createPage = function(page){
      return $http.post('/api/createPage', page, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var deletePage = function(pageId){
      return $http.delete('/api/deletePage', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken(),
        },
        params: {
            "pageId": pageId
        }
      });
    };

    var updatePage = function(pageId, page){
      return $http.put('/api/updatePage', page,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken(),
        },
        params: {
            "pageId": pageId
        }
      });
    };

    return {
      createPage      : createPage,
      getAllPages     : getAllPages,
      getPageById     : getPageById,
      getIndexPage    : getIndexPage,
      getPageByPath   : getPageByPath,
      deletePage      : deletePage,
      updatePage      : updatePage
    };
}]);
