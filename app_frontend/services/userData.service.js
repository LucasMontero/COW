//userData.service

angular.module('cowApp').service('userData', ['$http', 'authentication', function($http, authentication){

    var getAllUsers = function(){
      return $http.get('/api/users',{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getUser = function (userId) {
      return $http.get('/api/getUser', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        },
        params: {
            "userId": userId
        }
      });
    };

    var checkEmail = function(userEmail){
      return $http.get('/api/checkEmail', {
        params: {
            "userEmail": userEmail
        }
      });
    }

    var changuePassword = function(password){
      return $http.post('/api/changuePassword', {
        params: {
            "newPassword": newPassword
        }
      });
    }

    var createUser = function(user){
      return $http.post('/api/createUser', user, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var deleteUser = function(userId){
      return $http.delete('/api/deleteUser', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken(),
        },
        params: {
            "userId": userId
        }
      });
    };

    var updateUser = function(userId, user){
      return $http.put('/api/updateUser', user,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken(),
        },
        params: {
            "userId": userId
        }
      });
    };

    return {
      getUser     : getUser,
      createUser  : createUser,
      getAllUsers : getAllUsers,
      deleteUser  : deleteUser,
      updateUser  : updateUser
    };
}]);
