//designData.service
angular.module('cowApp').service('mailData', ['$http', 'authentication', function($http, authentication){

  var setMailParameters = function(mailForm){
    return $http.post('/api/setMailParameters', mailForm, {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken(),
      }
    });
  };

   return {
     setMailParameters  : setMailParameters
   };
}]);
