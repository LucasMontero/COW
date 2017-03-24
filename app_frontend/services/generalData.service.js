//designData.service
angular.module('cowApp').service('generalData', ['$http', 'authentication', function($http, authentication){

  var getGeneralParameters = function(){
    return $http.get('/api/getMailParameters',{
      headers: {
        Authorization: 'Bearer '+ authentication.getToken(),
      }
    });
  };

  var setGeneralParameters = function(mailForm){
    return $http.post('/api/setMailParameters', mailForm, {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken(),
      }
    });
  };

  return {
     getGeneralParameters  : getGeneralParameters,
     setGeneralParameters  : setGeneralParameters,
  };
}]);
