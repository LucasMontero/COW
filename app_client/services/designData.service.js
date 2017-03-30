//designData.service
angular.module('cowApp').service('designData', ['$http', 'authentication', function($http, authentication){

   var getDocument = function(type){
     return $http.get('/api/getDocument', {
       headers: {
         Authorization: 'Bearer '+ authentication.getToken(),
       },
       params: {
           "documentType": type
       }
     });
   };

   var saveDocument = function(type, content){
     return $http.get('/api/saveDocument', {
       headers: {
         Authorization: 'Bearer '+ authentication.getToken(),
       },
       params: {
           "documentType": type,
           "documentContent": content
       }
     });
   };

   return {
     getDocument  : getDocument,
     saveDocument : saveDocument,
   };
}]);
