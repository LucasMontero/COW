//designData.service
angular.module('cowApp').service('mailData', ['$http', 'authentication', function($http, authentication){

  var getMailParameters = function(){
    return $http.get('/api/getMailParameters',{
      headers: {
        Authorization: 'Bearer '+ authentication.getToken(),
      }
    });
  };

  var setMailParameters = function(mailForm){
    return $http.post('/api/setMailParameters', mailForm, {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken(),
      }
    });
  };

  var sendMail = function(mail){
    return $http.post('/api/sendMail', mail, {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken(),
      }
    });
  };

  return {
     getMailParameters  : getMailParameters,
     setMailParameters  : setMailParameters,
     sendMail           : sendMail
  };
}]);
