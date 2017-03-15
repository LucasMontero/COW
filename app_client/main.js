var cowApp = angular.module('cowApp', ['ngRoute', 'ui.codemirror']);

cowApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/views/front/page.view.html',
    controller: 'frontPageCtrl',
    controllerAs: 'ctl'
  })
  .when('/404', {
    templateUrl: '/views/front/errors/404.view.html',
    controller: '',
    controllerAs: 'ctl'
  })
  .when('/500', {
    templateUrl: '/views/front/errors/500.view.html',
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
    controller: 'pagesCtrl',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/pages/newPage', {
    templateUrl: '/views/adm/pageForm.view.html',
    controller: 'newPageCtrl',
    controllerAs: 'ctl'
  })
  .when('/cow-adm/pages/editPage/:pageId', {
    templateUrl: '/views/adm/pageForm.view.html',
    controller: 'editPageCtrl',
    controllerAs: 'ctl',
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
  .when('/cow-adm/design', {
    templateUrl: '/views/adm/design.view.html',
    controller: 'designCtrl',
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
  .when('/:pageId', {
    templateUrl: '/views/front/page.view.html',
    controller: 'frontPageCtrl',
    controllerAs: 'ctl'
  })
  .otherwise({redirectTo: '/404'});

  //Use the HTML5 History API
  $locationProvider.html5Mode(true);
});

cowApp.run(function ($rootScope, $location, $route, authentication) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (/cow-adm/.test($location.path()) && !authentication.isLoggedIn()) {
      $location.path('/cow-adm');
    }

    if($location.path() === '/cow-adm' && authentication.isLoggedIn()){
      $location.path('/cow-adm/home');
    }
  });
});

//#####CONTROLLERS#####

//home.controller
/**
 * Shows in log if controller is running
 *
 * @param  object titlePage     titlePage service object
 *
 */
angular.module("cowApp").controller("homeCtrl",["titlePage", function(titlePage){
  console.log("Home controller is running");
  titlePage.setTitle("COW Administration panel");
}]);

//Profile - profile.controller
/**
 * Try to get user data
 *
 * @param  object $routeParams    Parameters passed by Url
 * @param  object $location       Angular path location
 * @param  object userData        data.service.js service object
 * @param  object titlePage     titlePage service object
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
 * @param  object titlePage     titlePage service object
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
            message : error.toast.message
          }
        })
        .then(function(){
          $location.path('/cow-adm/home');
        });
    };
}]);

//pages.controller
/**
 * Fill pages view with pages data.
 *
 * @param  object $scope         Object that refers to the application model.
 * @param  object $location      Angular path service
 * @param  object $routeParams   Parameters passed by Url
 * @param  object pageData       pageData service object
 * @param  object titlePage      titlePage service object
 *
 */
angular.module("cowApp").controller("pagesCtrl",["$routeParams", "$scope","$location", "pageData", "titlePage" ,function($routeParams, $scope,$location, pageData, titlePage){
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Pages");

  /**
   * Delete a specific page by id and reload the pages list
   *
   * @param  string userId Id of the user that will be deleted
   *
   */
  $scope.deletePage = function(pageId) {
    pageData.deletePage(pageId)
      .success(function(data) {
        pageData.getAllPages()
          .success(function(data) {
            $scope.pages = data;
          })
          .error(function (error) {
            ctl.toast = {
              status  : error.toast.status,
              message : error.toast.message
            }
          });
          ctl.toast = {
            status  : data.toast.status,
            message : data.toast.message
          }
      })
      .error(function (error) {
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message
        }
      });
  };

  //Get users data function
  pageData.getAllPages()
    .success(function(data) {
      $scope.pages = data;
    })
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message
      }
    });
}]);

//newPage.controller
/**
 * Try to register a new page in database
 *
 * @param  object $location   Angular path location
 * @param  object pageData    pageData service object
 * @param  object titlePage     titlePage service object
 *
 */
angular.module("cowApp").controller("newPageCtrl",["$location", "pageData", "titlePage", function($location, pageData, titlePage){
  //ctl is the controller alias
  var ctl = this;

  titlePage.setTitle("COW Administration panel - New Page");

  ctl.isEdit = false;

  ctl.pageForm = {
    title   : "",
    path    : "",
    content : "",
    header  : false,
    footer  : false,
    index   : false,
    public  : false
   };

  //On form submit try to register the user.
  ctl.onSubmit = function () {
    console.log('Submitting creation');

    ctl.pageForm.header = document.getElementById('header').checked;
    ctl.pageForm.footer = document.getElementById('footer').checked;
    ctl.pageForm.index  = document.getElementById('index').checked;
    ctl.pageForm.public = document.getElementById('public').checked;

    pageData.createPage(ctl.pageForm).error(function(error){
        //Add toast
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message
        }
    }).then(function(response){
        //Add toast
        console.log(response.data.toast.message)
        $location.path('/cow-adm/pages');
    });
  };
}]);

//editPage.controller
/**
 * Edit a specific page by id
 *
 * @param  object $scope         Object that refers to the application model.
 * @param  object $routeParams   Parameters passed by url
 * @param  object $location      Angular path service
 * @param  object pageData       pageData service object
 * @param  object $routeParams   Parameters passed by Url
 * @param  object titlePage      titlePage service object
 *
 */
angular.module("cowApp").controller("editPageCtrl",["$scope", "$routeParams", "$location", "pageData", "titlePage" ,function($scope, $routeParams ,$location, pageData, titlePage){
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Edit Page");

  ctl.isEdit = true;

  ctl.pageForm = {};

  pageData.getPageById($routeParams.pageId)
    .success(function(data) {
      ctl.pageForm = data;
    })
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message
      }
    });

  //On form submit try to update de user
  ctl.onSubmit = function () {
    console.log('Updating page');
    ctl.pageForm.header = document.getElementById('header').checked;
    ctl.pageForm.footer = document.getElementById('footer').checked;
    ctl.pageForm.index  = document.getElementById('index').checked;
    ctl.pageForm.public = document.getElementById('public').checked;

    pageData.updatePage($routeParams.pageId, ctl.pageForm).error(function(error){
          //Add toast
          ctl.toast = {
            status  : error.toast.status,
            message : error.toast.message
          }
    }).then(function(response){
          //Add toast
          console.log(response.data.toast.message)
          $location.path('/cow-adm/pages');
    });
  };

}]);

//frontPageCtrl.controller
/**
 * Cronstruct the front page of the cms
 *
 * @param  object titlePage     titlePage service object
 * @param  object $location     Angular path service
 * @param  object pageData      pageData service object
 *
 */
angular.module("cowApp").controller("frontPageCtrl",["titlePage", "pageData", "$location", "$scope", "$sce", function(titlePage, pageData, $location, $scope, $sce){
  //controller alias
  var ctl = this;

  if($location.path() === '/'){
    pageData.getIndexPage()
     .success(function(data) {
         setPage(data);
      })
      .error(function (error) {
          $location.path('/500');
      });
  }else{
    pageData.getPageByPath($location.path())
     .success(function(data) {
          if (data.length === 1) {
              setPage(data);
          }else{
              $location.path('/404');
          }
      })
      .error(function (error) {
          $location.path('/500');
      });
  }

  var setPage = function(data){
    ctl.pageData = data[0];
    titlePage.setTitle(ctl.pageData.title);
    $scope.content = $sce.trustAsHtml(ctl.pageData.content);
  }

}]);

//users.controller
/**
 * Fill users view with users data.
 *
 * @param  object $routeParams   Parameters passed by Url
 * @param  object $scope         Object that refers to the application model.
 * @param  object $location      Angular path service
 * @param  object $routeParams   Parameters passed by Url
 * @param  object authentication Authentication service object
 * @param  object titlePage     titlePage service object
 *
 */
angular.module("cowApp").controller("usersCtrl",["$routeParams", "$scope","$location", "userData", "titlePage" ,function($routeParams, $scope,$location, userData, titlePage){
  var ctl = this;


  titlePage.setTitle("COW Administration panel - Users");

  /**
   * Delete a specific user by id and reload the users list
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
              message : error.toast.message
            }
          });
          ctl.toast = {
            status  : data.toast.status,
            message : data.toast.message
          }
      })
      .error(function (error) {
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message
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
        message : error.toast.message
      }
    });
}]);



/**
 * Try to register a new user in database
 *
 * @param  object $location   Angular path location
 * @param  object userData    userData service object
 * @param  object titlePage     titlePage service object
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
          message : error.toast.message
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
 * @param  object $routeParams  Parameters passed by url
 * @param  object $location     Angular path service
 * @param  object userData      userData service object
 * @param  object titlePage     titlePage service object
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
        message : error.toast.message
      }
    });

  //On form submit try to update de user
  ctl.onSubmit = function () {
    console.log('Submitting update');
    userData.updateUser($routeParams.userId, ctl.credentials).error(function(error){
          //Add toast
          ctl.toast = {
            status  : error.toast.status,
            message : error.toast.message
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
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
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
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
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

//design.controller
/**
 *
 * @param  object $scope          Object that refers to the application model.
 *
 */
angular.module('cowApp').controller('designCtrl', ['$scope', function($scope){
  $scope.menuItems = ['Css', 'Javascript', 'Header', 'Footer'];

  $scope.activeMenu = $scope.menuItems[0];

  $scope.setActive = function(menuItem) {
    $scope.activeMenu = menuItem
    switch (menuItem) {
      case 'Css':
        console.log("Css");
        break;
      case 'Javascript':
        console.log("Javascript");
        break;
      case 'Header':
        console.log("Header");
        break;
      case 'Footer':
        console.log("Footer");
        break;
    }
 }
}]);

//codemirror.controller
/**
 * Set codemirror editor options
 *
 * @param  object $scope          Object that refers to the application model.
 *
 */
angular.module('cowApp').controller('codemirrorCtrl', ['$scope', function($scope){
  $scope.htmlOptions = {
      lineNumbers: true,
      mode: 'xml',
      htmlMode: true,
      smartIndent: true,
      theme : 'material'
  };
  $scope.cssOptions = {
      lineNumbers: true,
      mode: 'css',
      htmlMode: true,
      smartIndent: true,
      theme : 'material'
  };
  $scope.jsOptions = {
      lineNumbers: true,
      mode: 'javascript',
      smartIndent: true,
      theme : 'material'
  };

  $scope.setOption = function(mode) {
    console.log($scope.editor + mode);
    //$scope.setOption("mode", <new mode>);
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

//pageData.service
angular.module('cowApp').service('pageData', ['$http', 'authentication', function($http, authentication){

    var getAllPages = function(){
      return $http.get('/api/pages',{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };


    var getPageById = function (pageId) {
      return $http.get('/api/getPageById', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        },
        params: {
            "pageId": pageId
        }
      });
    };

    var getIndexPage = function(){
      return $http.get('/api/getIndexPage');
    };

    var getPageByPath = function(pagePath){
      return $http.get('/api/getPageByPath', {
        params: {
            "pagePath": pagePath
        }
      });
    };

    var createPage = function(page){
      return $http.post('/api/createPage', page, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    var deletePage = function(pageId){
      return $http.delete('/api/deletePage', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken(),
        },
        params: {
            "pageId": pageId
        }
      });
    };

    var updatePage = function(pageId, page){
      return $http.put('/api/updatePage', page,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken(),
        },
        params: {
            "pageId": pageId
        }
      });
    }

    return {
      createPage      : createPage,
      getAllPages     : getAllPages,
      getPageById     : getPageById,
      getIndexPage    : getIndexPage,
      getPageByPath   : getPageByPath,
      deletePage      : deletePage,
      updatePage      : updatePage
    };
}]);

//titlePage.service
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
      templateUrl: "/views/adm/directives/navigation.view.html",
      controller: "navigationCtrl as navCtl"
  }
});

//sidebar.directive -> See also sidebar.controller
angular.module("cowApp").directive("sidebar", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/sidebar.view.html",
      controller: "sidebarCtrl as sideCtl"
  }
});

//toast.directive
angular.module("cowApp").directive("toast", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/toast.view.html",
      controller: ""
  }
});

//codemirror.directive
angular.module("cowApp").directive("codemirror", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/codemirror.view.html",
      controller: "codemirrorCtrl as cmCtl"
  }
});


//***FRONT PAGE***

//cowheader.directive
angular.module("cowApp").directive("cowheader", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/front/directives/header.view.html",
      controller: ""
  }
});

//cowfooter.directive
angular.module("cowApp").directive("cowfooter", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/front/directives/footer.view.html",
      controller: ""
  }
});
