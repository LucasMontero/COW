var cowApp = angular.module('cowApp', ['ngRoute']);

cowApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/views/login.view.html',
    controller: 'loginCtrl',
    controllerAs: 'ctl'
  })
  .when('/home', {
    templateUrl: '/views/home.view.html',
    controller: 'homeCtrl',
    controllerAs: 'ctl'
  })
  .when('/pages', {
    templateUrl: '/views/pages.view.html',
    controller: '',
    controllerAs: ''
  })
  .when('/multimedia', {
    templateUrl: '/views/multimedia.view.html',
    controller: '',
    controllerAs: ''
  })
  .when('/plugins', {
    templateUrl: '/views/plugins.view.html',
    controller: '',
    controllerAs: ''
  })
  .when('/themes', {
    templateUrl: '/views/themes.view.html',
    controller: '',
    controllerAs: ''
  })
  .when('/users', {
    templateUrl: '/views/users.view.html',
    controller: 'usersCtrl',
    controllerAs: 'ctl'
  })
  .when('/users/profile/:userId', {
    templateUrl: '/views/profile.view.html',
    controller: 'profileCtrl',
    controllerAs: 'ctl'
  })
  .when('/users/newUser', {
    templateUrl: '/views/userForm.view.html',
    controller: 'newUserCtrl',
    controllerAs: 'ctl'
  })
  .when('/users/editUser/:userId', {
    templateUrl: '/views/userForm.view.html',
    controller: 'editUserCtrl',
    controllerAs: 'ctl'
  })
  .when('/settings', {
    templateUrl: '/views/settings.view.html',
    controller: '',
    controllerAs: ''
  })
  .otherwise({redirectTo: '/'});

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});

cowApp.run(function ($rootScope, $location, $route, authentication) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if ($location.path() !== '/' && !authentication.isLoggedIn()) {
      $location.path('/');
    }

    if($location.path() === '/' && authentication.isLoggedIn()){
      $location.path('/home');
    }
  });
});

//#####CONTROLLERS#####

//home.controller
/*
 * Shows in log if controller is running
 */
angular.module("cowApp").controller("homeCtrl", function(){
  console.log("Home controller is running");
});

//Profile - profile.controller
/**
 * Try to get user data
 *
 * @param  object $routeParams   Parameters passed by Url
 * @param  object $location Angular path location
 * @param  object userData  data.service.js service object
 *
 */
angular.module("cowApp").controller("profileCtrl",["$routeParams", "$location", "userData" ,function($routeParams, $location, userData){
  var ctl = this;

  ctl.user = {};

  //Get user data function
  userData.getUser($routeParams.userId)
    .success(function(data) {
      ctl.user = data;
    })
    .error(function (e) {
      console.log(response.toast.message);
    });
}]);

//Authentication - login.controller
/**
 * Try to login the user with passed credentials
 *
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 *
 */
angular.module("cowApp").controller("loginCtrl",['$location', 'authentication',function($location, authentication) {
    //ctl is the controller alias
    var ctl = this;

    ctl.credentials = {
      email : "",
      password : ""
    };
    ctl.toast = {
      message : "Mensaje del toast"
    }
    //On form submit add input data to credentials variables and try to login with them.
    ctl.onSubmit = function () {
      authentication.login(ctl.credentials)
        .error(function(response){
          //Add toast
          alert(response.toast.message);
        })
        .then(function(){
          $location.path('home');
        });
    };

}]);

//users.controller
/**
 * Fill users view with users data.
 *
 * @param  object $scope         Object that refers to the application model.
 * @param  object $location      Angular path service
 * @param  object $routeParams   Parameters passed by Url
 * @param  object authentication Authentication service object
 *
 */
angular.module("cowApp").controller("usersCtrl",["$routeParams", "$scope","$location", "userData" ,function($routeParams, $scope,$location, userData){
  var ctl = this;

  /**
   * Delete a specific user by id and reload the user list
   *
   * @param  string userId Id of the user that will be deleted
   *
   */
  $scope.deleteUser = function(userId) {
    userData.deleteUser(userId)
      .success(function(data) {
        userData.getAllUsers()
          .success(function(data) {
            $scope.users = data;
          })
          .error(function (e) {
            console.log(response.toast)
          });
      })
      .error(function (e) {
        console.log(response.toast)
      });
  };

  //Get users data function
  userData.getAllUsers()
    .success(function(data) {
      $scope.users = data;
    })
    .error(function (e) {
      console.log(response.toast)
    });
}]);

/**
 * Try to register a new user in database
 *
 * @param  object userData    userData service object
 * @param  object $location   Angular path location
 *
 */
angular.module("cowApp").controller("newUserCtrl",["$location", "userData", function($location, userData){
  //ctl is the controller alias
  var ctl = this;
  ctl.isEdit = false;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  //On form submit try to register the user.
  ctl.onSubmit = function () {
    console.log('Submitting creation');
    userData.createUser(ctl.credentials).error(function(response){
        //Add toast
        alert(response.toast.message);
    }).then(function(response){
        //Add toast
        console.log(response.data.toast.message)
        $location.path('users');
    });
  };
}]);

//editUser.controller
/**
 * Edit a specific user by id
 *
 * @param  object $routeParams Parameters passed by url
 * @param  object $location Angular path service
 * @param  object authentication Authentication service object
 *
 */
angular.module("cowApp").controller("editUserCtrl",["$routeParams", "$location", "userData" ,function($routeParams ,$location, userData){
  var ctl = this;
  ctl.isEdit = true;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  userData.getUser($routeParams.userId)
    .success(function(data) {
      ctl.credentials = data;
    })
    .error(function (e) {
      console.log(response.toast)
    });

  //On form submit try to update de user
  ctl.onSubmit = function () {
    console.log('Submitting update');
    userData.updateUser($routeParams.userId, ctl.credentials).error(function(response){
          //Add toast
          console.log(response.toast)
    }).then(function(response){
          //Add toast
          console.log(response.data.toast.message)
          $location.path('users');
    });
  };

}]);

//navigation.controller -> See also navigation.service
/**
 * Check if user is authenticated and if it is, shows the current user.
 *
 * @param  object $location Angular path location
 * @param  object authentication Authentication service object
 *
 */
angular.module('cowApp').controller('navigationCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication){
  //ctl is the controller alias
  var ctl = this;

  ctl.isLoggedIn  = authentication.isLoggedIn();
  ctl.currentUser = authentication.currentUser();

  /**
   * Delete the user session on the browser
   */
  $scope.logout = function(){
    authentication.logout();
    $location.path('/');
  };
}]);



//#####SERVICES#####

//Authentication.service

/*A JWT token is actually made up of three separate strings, separated by a dot(.). These three parts are:
 *
 *Header – An encoded JSON object containing the type and the hashing algorithm used
 *Payload – An encoded JSON object containing the data, the real body of the token
 *Signature – An encrypted hash of the header and payload, using the “secret” set on the server
*/

angular.module('cowApp').service('authentication', ['$http', '$window', function($http, $window){
  var saveToken = function (token) {
    $window.localStorage['mean-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['mean-token'];
  };

  var isLoggedIn = function() {
    var token = getToken();

    if(token){
      var payload = preparePayload(token);
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = preparePayload(token);
      return {
        _id   : payload._id,
        email : payload.email,
        name  : payload.name
      };
    }
  };

  //private function
  var preparePayload = function(token){
    var payload = token.split('.')[1];
    payload = $window.atob(payload);
    payload = JSON.parse(payload);

    return payload;
  }

  login = function(user) {
    return $http.post('/api/login', user).success(function(data) {
      saveToken(data.token);
    });
  };

  logout = function() {
     $window.localStorage.removeItem('mean-token');
  };

  return {
    currentUser : currentUser,
    saveToken   : saveToken,
    getToken    : getToken,
    isLoggedIn  : isLoggedIn,
    login       : login,
    logout      : logout
  };
}]);

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

    var createUser = function(user){
      return $http.post('/api/createUser', user, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

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
    }

    return {
      getUser     : getUser,
      createUser  : createUser,
      getAllUsers : getAllUsers,
      deleteUser  : deleteUser,
      updateUser  : updateUser
    };
}]);

//#####DIRECTIVES#####

//navigation.directive -> See also navigation.controller
angular.module("cowApp").directive("navigation", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/navigation.view.html",
      controller: "navigationCtrl as navctl"
  }
});

//sidebar.directive
angular.module("cowApp").directive("sidebar", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/sidebar.view.html",
      controller: ""
  }
});
