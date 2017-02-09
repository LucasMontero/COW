var cowApp = angular.module('meanApp', ['ngRoute']);

cowApp.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './views/home.view.html',
    controller: 'homeCtrl',
    controllerAs: 'vm'
  })
  .when('/register', {
    templateUrl: './views/register.view.html',
    controller: 'registerCtrl',
    controllerAs: 'vm'
  })
  .when('/login', {
    templateUrl: './views/login.view.html',
    controller: 'loginCtrl',
    controllerAs: 'vm'
  })
  .when('/profile', {
    templateUrl: './views/profile.view.html',
    controller: 'profileCtrl',
    controllerAs: 'vm'
  })
  .otherwise({redirectTo: '/'});

  // use the HTML5 History API
  //$locationProvider.html5Mode(true);
});

cowApp.run(function ($rootScope, $location, $route, authentication) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
      $location.path('/');
    }
  });
});


//#####CONTROLLERS#####

//home.controller
/*
 * Shows in log if controller is running
 */
angular.module("meanApp").controller("homeCtrl", function(){
  console.log("Home controller is running")
});

//Profile - profile.controller
/**
 * Try to get user data
 *
 * @param  object $location Angular path location
 * @param  object meanData  data.service.js service object
 *
 */
angular.module("meanApp").controller("profileCtrl",["$location", "meanData" ,function($location, meanData){
  var vm = this;

  vm.user = {};

  //Get user data function
  meanData.getProfile()
    .success(function(data) {
      vm.user = data;
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
angular.module("meanApp").controller("loginCtrl",['$location', 'authentication',function($location, authentication) {
    //vm is the controller alias
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };
    //On form submit add input data to credentials variables and try to login with them.
    vm.onSubmit = function () {
      authentication.login(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };

}]);

//Authentication - register.controller
/**
 * Try to register a new user in database
 *
 * @param  object $location Angular path location
 * @param  object authentication Authentication service object
 *
 */
angular.module("meanApp").controller("registerCtrl",["$location", "authentication", function($location, authentication){
  //vm is the controller alias
  var vm = this;

  vm.credentials = {
    name : "",
    email : "",
    password : ""
  };

  //On form submit add input data to variables and try to register the user.
  vm.onSubmit = function () {
    console.log('Submitting registration');
    authentication.register(vm.credentials).error(function(err){
        alert(err);
      }).then(function(){
        $location.path('profile');
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
angular.module('meanApp').controller('navigationCtrl', ['$location','authentication', function($location, authentication){
  //vm is the controller alias
  var vm = this;

  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentUser = authentication.currentUser();

}]);

//#####SERVICES#####

//Authentication.service

/*A JWT token is actually made up of three separate strings, separated by a dot(.). These three parts are:
 *
 *Header – An encoded JSON object containing the type and the hashing algorithm used
 *Payload – An encoded JSON object containing the data, the real body of the token
 *Signature – An encrypted hash of the header and payload, using the “secret” set on the server
*/


angular.module('meanApp').service('authentication', ['$http', '$window', function($http, $window){
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
        name : payload.name
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
angular.module('meanApp').service('meanData', ['$http', 'authentication', function($http, authentication){
    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
}]);

//#####DIRECTIVES#####
//navigation.service -> See also navigation.controller
angular.module("meanApp").directive("navigation", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/navigation.view.html",
      controller: "navigationCtrl as navvm"
  }
});
