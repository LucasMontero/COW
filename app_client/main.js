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
  .when('/logout', {
      templateUrl: '',
      controller: 'logoutCtrl',
      controllerAs: 'ctl'
  })
  .when('/profile', {
    templateUrl: '/views/profile.view.html',
    controller: 'profileCtrl',
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
  .when('/users/newUser', {
    templateUrl: '/views/userForm.view.html',
    controller: 'registerCtrl',
    controllerAs: 'ctl'
  })
  .when('/users/deleteUser/:userId', {
    templateUrl: '',
    controller: 'deleteUserCtrl',
    controllerAs: 'ctl'
  })
  .when('/users/editUser/:userId', {
    templateUrl: '/views/userForm.view.html',
    controller: 'editUserCtrl',
    controllerAs: 'ctl'
  })
  .when('/options', {
    templateUrl: '/views/options.view.html',
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
 * @param  object $location Angular path location
 * @param  object meanData  data.service.js service object
 *
 */
angular.module("cowApp").controller("profileCtrl",["$location", "meanData" ,function($location, meanData){
  var ctl = this;

  ctl.user = {};

  //Get user data function
  meanData.getProfile()
    .success(function(data) {
      ctl.user = data;
    })
    .error(function (e) {
      console.log(e);
    });
}]);

//Authentication - login.controller
/**
 * Try to login the user with passed credentials
 *
 * @param  object $location Angular path location
 * @param  object authentication Authentication service object
 *
 */
angular.module("cowApp").controller("loginCtrl",['$location', 'authentication',function($location, authentication) {
    //ctl is the controller alias
    var ctl = this;

    ctl.credentials = {
      email : "",
      password : ""
    };
    //On form submit add input data to credentials variables and try to login with them.
    ctl.onSubmit = function () {
      authentication.login(ctl.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('home');
        });
    };

}]);

//Authentication - logout.controller
/**
 * Delete the user session on the browser
 *
 * @param  object $location Angular path location
 * @param  object authentication Authentication service object
 *
 */
 angular.module('cowApp').controller('logoutCtrl', ['$location', 'authentication', function($location, authentication){
   //ctl is the controller alias
   var ctl = this;

   ctl.logout =  authentication.logout();
   $location.path('/');
 }]);

//Authentication - register.controller
/**
 * Try to register a new user in database
 *
 * @param  object $location Angular path location
 * @param  object authentication Authentication service object
 *
 */
angular.module("cowApp").controller("registerCtrl",["$location", "authentication", function($location, authentication){
  //ctl is the controller alias
  var ctl = this;
  ctl.isEdit = false;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  //On form submit add input data to variables and try to register the user.
  ctl.onSubmit = function () {
    console.log('Submitting registration');
    authentication.register(ctl.credentials).error(function(err){
        alert(err);
    }).then(function(){
        $location.path('users');
    });
  };
}]);

//users.controller
/**
 * Fill users view with users data.
 *
 * @param  object $scope object that refers to the application model.
 * @param  object $location Angular path service
 * @param  object authentication Authentication service object
 *
 */
angular.module("cowApp").controller("usersCtrl",["$scope","$location", "meanData" ,function($scope,$location, meanData){
  var ctl = this;

  //Get users data function
  meanData.getAllUsers()
    .success(function(data) {
      console.log(data);
      $scope.users = data;
    })
    .error(function (e) {
      console.log(e);
    });
}]);

//deleteUser.controller
/**
 * Delete a specific user by id
 *
 * @param  object $routeParams Parameters passed by url
 * @param  object $location Angular path service
 * @param  object authentication Authentication service object
 *
 */

angular.module("cowApp").controller("deleteUserCtrl",["$routeParams", "$location", "meanData" ,function($routeParams ,$location, meanData){
  var ctl = this;

  //Get users data function
  meanData.deleteUser($routeParams.userId)
    .success(function(data) {
      $location.path('users');
    })
    .error(function (e) {
      console.log(e);
    });
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

angular.module("cowApp").controller("editUserCtrl",["$routeParams", "$location", "meanData" ,function($routeParams ,$location, meanData){
  var ctl = this;
  ctl.isEdit = true;

}]);

//navigation.controller -> See also navigation.service
/**
 * Check if user is authenticated and if it is, shows the current user.
 *
 * @param  object $location Angular path location
 * @param  object authentication Authentication service object
 *
 */
angular.module('cowApp').controller('navigationCtrl', ['$location', 'authentication', function($location, authentication){
  //ctl is the controller alias
  var ctl = this;

  ctl.isLoggedIn  = authentication.isLoggedIn();
  ctl.currentUser = authentication.currentUser();
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
    var payload;

    if(token){
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email : payload.email,
        name  : payload.name
      };
    }
  };

  register = function(user) {
    return $http.post('/api/register', user).success(function(data){
      saveToken(data.token);
    });
  };

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
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    register : register,
    login : login,
    logout : logout
  };
}]);

//data.service
angular.module('cowApp').service('meanData', ['$http', 'authentication', function($http, authentication){
    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getAllUsers = function(){
      return $http.get('/api/users',{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getUser = function (userId) {
      return $http.get('/api/user', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        },
        params: {
            "userId": userId
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

    return {
      getProfile  : getProfile,
      getAllUsers : getAllUsers,
      deleteUser  : deleteUser
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
