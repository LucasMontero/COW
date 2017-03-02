var cowApp = angular.module('cowApp', ['ngRoute']);

cowApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/views/front/page.view.html',
    controller: '',
    controllerAs: 'ctl'
  })
  .when('/cow-adm', {
    templateUrl: '/views/adm/login.view.html',
    controller: 'loginCtrl',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/home', {
    templateUrl: '/views/adm/home.view.html',
    controller: 'homeCtrl',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/pages', {
    templateUrl: '/views/adm/pages.view.html',
    controller: '',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/multimedia', {
    templateUrl: '/views/adm/multimedia.view.html',
    controller: '',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/plugins', {
    templateUrl: '/views/adm/plugins.view.html',
    controller: '',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/themes', {
    templateUrl: '/views/adm/themes.view.html',
    controller: '',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/users', {
    templateUrl: '/views/adm/users.view.html',
    controller: 'usersCtrl',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/users/profile/:userId', {
    templateUrl: '/views/adm/profile.view.html',
    controller: 'profileCtrl',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/users/newUser', {
    templateUrl: '/views/adm/userForm.view.html',
    controller: 'newUserCtrl',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/users/editUser/:userId', {
    templateUrl: '/views/adm/userForm.view.html',
    controller: 'editUserCtrl',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/settings', {
    templateUrl: '/views/adm/settings.view.html',
    controller: '',
    controllerAs: 'ctl'
  })
  .otherwise({redirectTo: '/'});

  //Use the HTML5 History API
  $locationProvider.html5Mode(true);
});

cowApp.run(function ($rootScope, $location, $route, authentication) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (/cow-adm/.test($location.$$path) && !authentication.isLoggedIn()) {
      $location.path('/cow-adm');
    }

    if($location.path() === '/cow-adm' && authentication.isLoggedIn()){
      $location.path('/cow-adm/home');
    }
  });
});

//#####CONTROLLERS#####

//home.controller
/*
 * Shows in log if controller is running
 */
angular.module("cowApp").controller("homeCtrl",["titlePage", function(titlePage){
  console.log("Home controller is running");
  titlePage.setTitle("COW Administration panel");
}]);

//Profile - profile.controller
/**
 * Try to get user data
 *
 * @param  object $routeParams   Parameters passed by Url
 * @param  object $location Angular path location
 * @param  object userData  data.service.js service object
 *
 */
angular.module("cowApp").controller("profileCtrl",["$routeParams", "$location", "userData", "titlePage" ,function($routeParams, $location, userData, titlePage){
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Profile");

  ctl.user = {};

  //Get user data function
  userData.getUser($routeParams.userId)
    .success(function(data) {
      ctl.user = data;
    })
    .error(function (error) {
      console.log(error.toast.message);
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
angular.module("cowApp").controller("loginCtrl",['$location', "authentication", "titlePage",function($location, authentication, titlePage) {
    //ctl is the controller alias
    var ctl = this;

    titlePage.setTitle("COW Administration panel - Login");

    ctl.credentials = {
      email : "",
      password : ""
    };

    //On form submit add input data to credentials variables and try to login with them.
    ctl.onSubmit = function () {
      authentication.login(ctl.credentials)
        .error(function(error){
          ctl.toast = {
            status  : error.toast.status,
            message : error.toast.message,
            error   : error.toast.error
          }
        })
        .then(function(){
          $location.path('/cow-adm/home');
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
angular.module("cowApp").controller("usersCtrl",["$routeParams", "$scope","$location", "userData", "titlePage" ,function($routeParams, $scope,$location, userData, titlePage){
  var ctl = this;


  titlePage.setTitle("COW Administration panel - Users");

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
          .error(function (error) {
            ctl.toast = {
              status  : error.toast.status,
              message : error.toast.message,
              error   : error.toast.error
            }
          });
          ctl.toast = {
            status  : data.toast.status,
            message : data.toast.message,
            error   : data.toast.error
          }
      })
      .error(function (error) {
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message,
          error   : error.toast.error
        }
      });
  };

  //Get users data function
  userData.getAllUsers()
    .success(function(data) {
      $scope.users = data;
    })
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message,
        error   : error.toast.error
      }
    });
}]);

/**
 * Try to register a new user in database
 *
 * @param  object userData    userData service object
 * @param  object $location   Angular path location
 *
 */
angular.module("cowApp").controller("newUserCtrl",["$location", "userData", "titlePage", function($location, userData, titlePage){
  //ctl is the controller alias
  var ctl = this;

  titlePage.setTitle("COW Administration panel - New User");

  ctl.isEdit = false;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  //On form submit try to register the user.
  ctl.onSubmit = function () {
    console.log('Submitting creation');
    userData.createUser(ctl.credentials).error(function(error){
        //Add toast
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message,
          error   : error.toast.error
        }
    }).then(function(response){
        //Add toast
        console.log(response.data.toast.message)
        $location.path('/cow-adm/users');
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
angular.module("cowApp").controller("editUserCtrl",["$routeParams", "$location", "userData", "titlePage" ,function($routeParams ,$location, userData, titlePage){
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Edit User");

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
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message,
        error   : error.toast.error
      }
    });

  //On form submit try to update de user
  ctl.onSubmit = function () {
    console.log('Submitting update');
    userData.updateUser($routeParams.userId, ctl.credentials).error(function(error){
          //Add toast
          ctl.toast = {
            status  : error.toast.status,
            message : error.toast.message,
            error   : error.toast.error
          }
    }).then(function(response){
          //Add toast
          console.log(response.data.toast.message)
          $location.path('/cow-adm/users');
    });
  };

}]);

//navigation.controller -> See also navigation.service
/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $location Angular path location
 * @param  object authentication Authentication service object
 *
 */
angular.module('cowApp').controller('navigationCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication){
  //ctl is the controller alias
  var ctl = this;

  //Check if user is authenticated and if it is, shows the current user.
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

//sidebar.controller -> See also sidebar.service
/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $location Angular path location
 * @param  object authentication Authentication service object
 *
 */
angular.module('cowApp').controller('sidebarCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication){
  //ctl is the controller alias
  var ctl = this;

  ctl.menuView  =  function(){
    switch (true) {
      case /users/.test($location.$$path):
        return "users";
        break;
    }
  }

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

angular.module('cowApp').service('titlePage', ['$window', function($window){
   var setTitle = function(title){
     $window.document.title = title;
   }

   return {
     setTitle: setTitle
   };
}]);

//#####DIRECTIVES#####

//***ADM PANEL***

//navigation.directive -> See also navigation.controller
angular.module("cowApp").directive("navigation", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/navigation.view.html",
      controller: "navigationCtrl as navCtl"
  }
});

//sidebar.directive -> See also sidebar.controller
angular.module("cowApp").directive("sidebar", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/sidebar.view.html",
      controller: "sidebarCtrl as sideCtl"
  }
});

//sidebar.directive
angular.module("cowApp").directive("toast", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/toast.view.html",
      controller: ""
  }
});

//***FRONT PAGE***

angular.module("cowApp").directive("cowheader", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/front/header.view.html",
      controller: ""
  }
});


angular.module("cowApp").directive("cowfooter", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/front/footer.view.html",
      controller: ""
  }
});
