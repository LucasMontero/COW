//designData.service
angular.module('cowApp').service('mailData', ['$http', 'authentication', function($http, authentication){

  var saveMailParameters = function(){
    console.log("saveMailParameters");
    /*return $http.put('/api/saveMailParameters', ctl.mailForm, {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken(),
      }
    });*/
  };

   return {
     saveMailParameters  : saveMailParameters
   };
}]);
