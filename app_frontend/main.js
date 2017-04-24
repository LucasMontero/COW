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
    controller: 'multimediaCtrl',
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
    controller: 'settingsCtrl',
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

//codemirror.controller
/**
 * Set codemirror editor options
 *
 * @param  object $scope          Object that refers to the application model.
 *
 */
angular.module('cowApp').controller('codemirrorCtrl', ['$scope', function($scope){
  // The modes 'css', 'xml', 'javascript';

  $scope.initMode = "xml"
 
 // The ui-codemirror options
 $scope.cmOptions = {
   lineNumbers: true,
   htmlMode: true,
   smartIndent: true,
   indentWithTabs: true,
   theme : 'material',
   onLoad : function(_cm){
     // HACK to have the codemirror instance in the scope...
     $scope.setMode = function(mode){
       _cm.setOption("mode", mode);
     };

     $scope.setMode($scope.initMode);
   }
 };
}]);

//design.controller
/**
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object desingData      desingData service object
 * @param  object appUtilities    appUtilities service object
 *
 */
angular.module('cowApp').controller('designCtrl', ['$scope', 'designData', 'appUtilities', function($scope, designData, appUtilities){
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Design");

  $scope.menuItems = [['Css', 'css'], ['Javascript', 'javascript'], ['Header', 'xml'], ['Footer', 'xml']];

  designData.getDocument('Css')
    .success(function(data) {
        ctl.design.content = data;
    })
    .error(function (error) {
        ctl.toast = appUtilities.createToast(error.toast);
    });

  ctl.design = {};

  $scope.activeMenu = $scope.menuItems[0];

  $scope.setActive = function(menuItem) {
    $scope.activeMenu = menuItem;

    designData.getDocument(menuItem[0])
      .success(function(data) {
          ctl.design.content = data;
      })
      .error(function (error) {
          ctl.toast = appUtilities.createToast(error.toast);
      });
  }

  //On form submit try to save the document
  ctl.onSubmit = function () {
    ctl.execution = true;
    console.log('Submitting update');
    designData.saveDocument($scope.activeMenu[0], ctl.design.content)
      .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
      })
      .then(function(response){
          ctl.toast = appUtilities.createToast(response.data.toast);
     }).finally(function() {
          ctl.execution = false;
     });;
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
 * @param  object appUtilities      appUtilities service object
 *
 */
angular.module("cowApp").controller("editPageCtrl",["$scope", "$routeParams", "$location", "pageData", "appUtilities" ,function($scope, $routeParams ,$location, pageData, appUtilities){
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Edit Page");

  ctl.isEdit = true;

  ctl.pageForm = {};

  pageData.getPageById($routeParams.pageId)
    .success(function(data) {
      ctl.pageForm = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });

  //On form submit try to update de user
  ctl.onSubmit = function () {
    console.log('Updating page');
    ctl.pageForm.header = document.getElementById('header').checked;
    ctl.pageForm.footer = document.getElementById('footer').checked;
    ctl.pageForm.index  = document.getElementById('index').checked;
    ctl.pageForm.public = document.getElementById('public').checked;

    pageData.updatePage($routeParams.pageId, ctl.pageForm).error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
    }).then(function(response){
          //Add toast
          console.log(response.data.toast.message)
          $location.path('/cow-adm/pages');
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
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("editUserCtrl",["$routeParams", "$location", "userData", "appUtilities" ,function($routeParams ,$location, userData, appUtilities){
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Edit User");

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
      ctl.toast = appUtilities.createToast(error.toast);
    });

  //On form submit try to update the user
  ctl.onSubmit = function () {
    console.log('Submitting update');
    userData.updateUser($routeParams.userId, ctl.credentials).error(function(error){
      ctl.toast = appUtilities.createToast(error.toast);
    }).then(function(response){
      //Add toast
      console.log(response.data.toast.message)
      $location.path('/cow-adm/users');
    });
  };

}]);


//frontPageCtrl.controller
/**
 * Cronstruct the front page of the application
 *
 * @param  object appUtilities     appUtilities service object
 * @param  object $location     Angular path service
 * @param  object pageData      pageData service object
 *
 */
angular.module("cowApp").controller("frontPageCtrl",["appUtilities", "pageData", "$location", "$scope", "$sce", function(appUtilities, pageData, $location, $scope, $sce){
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
    appUtilities.setTitle(ctl.pageData.title);
    $scope.content = $sce.trustAsHtml(ctl.pageData.content);
  }

}]);

//home.controller
/**
 * Shows in log if controller is running
 *
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("homeCtrl",["appUtilities", function(appUtilities){
  console.log("Home controller is running");
  appUtilities.setTitle("COW Administration panel");
}]);

//Authentication - login.controller
/**
 * Try to login the user with passed credentials
 *
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("loginCtrl",['$location', "authentication", "appUtilities",function($location, authentication, appUtilities) {
    //ctl is the controller alias
    var ctl = this;

    appUtilities.setTitle("COW Administration panel - Login");

    ctl.credentials = {
      email : "",
      password : ""
    };

    //On form submit add input data to credentials variables and try to login with them.
    ctl.onSubmit = function () {
      authentication.login(ctl.credentials)
        .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
        })
        .then(function(){
          $location.path('/cow-adm/home');
        });
    };
}]);




angular.module("cowApp").controller("multimediaCtrl",[function(){
  var ctl = this;
  // var files = readdir("../../public/multimedia");
  ctl.index = "HOla";

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

//newPage.controller
/**
 * Try to register a new page in database
 *
 * @param  object $location   Angular path location
 * @param  object pageData    pageData service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("newPageCtrl",["$location", "pageData", "mailData", "appUtilities", function($location, pageData, mailData, appUtilities){
  //ctl is the controller alias
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - New Page");

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

    pageData.createPage(ctl.pageForm)
      .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
      })
      .then(function(response){
          var subject = "New page";
          var text    = "A new page has been created";
          var html    = "<p>A new page has been created</p>";

          var mail     = mailData.createEmail(null, subject, text, html);

          mailData.sendMail(mail);
          //Add toast
          console.log(response.data.toast.message)
          $location.path('/cow-adm/pages');
      });
  };
}]);

/**
 * Try to register a new user in database
 *
 * @param  object $location   Angular path location
 * @param  object userData    userData service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("newUserCtrl",["$location", "userData", "mailData", "appUtilities", function($location, userData, mailData, appUtilities){
  //ctl is the controller alias
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - New User");

  ctl.isEdit = false;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  //On form submit try to register the user.
  ctl.onSubmit = function () {
      ctl.execution = true;
      console.log('Submitting creation');

      userData.createUser(ctl.credentials)
        .error(function(error){
            ctl.toast = appUtilities.createToast(error.toast);
            ctl.execution = false;
        }).then(function(response){
            var subject = "New user";
            var text    = "A new user with name "+ ctl.credentials.name +" & email "+ctl.credentials.email+" has been created.";
            var html    = "<p>A new user with name "+ ctl.credentials.name +" & email "+ctl.credentials.email+" has been created.</p>";

            var mail     = mailData.createEmail(null, subject, text, html);

            mailData.sendMail(mail);

            //Add toast
            console.log(response.data.toast.message)

            $location.path('/cow-adm/users');
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
 * @param  object appUtilities      appUtilities service object
 *
 */
angular.module("cowApp").controller("pagesCtrl",["$routeParams", "$scope","$location", "pageData", "appUtilities" ,function($routeParams, $scope,$location, pageData, appUtilities){
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Pages");

  //Get users data function
  pageData.getAllPages()
    .success(function(data) {
      $scope.pages = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });
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
            ctl.toast = appUtilities.createToast(error.toast);
          });
          ctl.toast = appUtilities.createToast(data.toast);
      })
      .error(function (error) {
        ctl.toast = appUtilities.createToast(error.toast);
      });
  };
}]);

//Profile - profile.controller
/**
 * Try to get user data
 *
 * @param  object $routeParams    Parameters passed by Url
 * @param  object $location       Angular path location
 * @param  object userData        data.service.js service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("profileCtrl",["$routeParams", "$location", "userData", "appUtilities" ,function($routeParams, $location, userData, appUtilities){
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Profile");

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

/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 *
 */
angular.module('cowApp').controller('settingsCtrl', ['$scope', 'appUtilities', function($scope, appUtilities){
  //ctl is the controller alias
  var ctl = this;

  $scope.menuItems = [["General", 1], ["Mail", 2], ["IP Ban", 3], ["Limit Login", 4]];

  $scope.activeMenu = $scope.menuItems[0];

  $scope.setActive = function(menuItem) {
    $scope.activeMenu = menuItem;
  }
}]);

/**
 * Build the parameters and functions used in settings.mailing.view
 *
 * @param  object appUtilities  appUtilities service object
 * @param  object generalData   generalData  service object
 *
 */
angular.module('cowApp').controller('stGeneralCtrl', ['appUtilities', 'generalData', function(appUtilities, mailData){
  //ctl is the controller alias
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - General Settings");

  mailData.getGeneralParameters()
    .success(function(data) {
      ctl.mailForm = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });


  //On form submit try to register the user.
  ctl.onSubmit = function(){
    ctl.execution = true;
    console.log('Setting general parameters');

    generalData.setGeneralParameters(ctl.mailForm)
      .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
          console.log(ctl.toast);
      }).then(function(response){
          ctl.toast = appUtilities.createToast(response.data.toast);
          console.log(ctl.toast);
      }).finally(function(){
          ctl.execution = false;
      });
  };

}]);

/**
 * Build the parameters and functions used in settings.mailing.view
 *
 * @param  object appUtilities  appUtilities service object
 * @param  object mailData      maildata service object
 *
 */
angular.module('cowApp').controller('stMailingCtrl', ['appUtilities', 'mailData', function(appUtilities, mailData){
  //ctl is the controller alias
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Mailing Settings");

  ctl.mailTo = "";

  mailData.getMailParameters()
    .success(function(data) {
      ctl.mailForm = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });

  //On form submit try to register the user.
  ctl.onSubmit = function(){
    ctl.execution = true;
    console.log('Setting mail parameters');

    ctl.mailForm.secure = document.getElementById('secure').checked;

    mailData.setMailParameters(ctl.mailForm)
      .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
          console.log(ctl.toast);
      }).then(function(response){
          ctl.toast = appUtilities.createToast(response.data.toast);
          console.log(ctl.toast);
      }).finally(function(){
          ctl.execution = false;
      });
  };

  //Try to send a mail to passed mail direction with saved parameters
  ctl.onTestMail = function(){
    ctl.execution = true;
    console.log('Testing mail parameters');

    var subject = "Test Message";
    var text    = "This is a test message from cow administration panel";
    var html    = "<p>This is a test message from cow administration panel</p>";

    var mail     = mailData.createEmail(ctl.mailTo, subject, text, html);

    mailData.sendMail(mail)
      .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
          console.log(ctl.toast);
      }).then(function(response){
          ctl.toast = appUtilities.createToast(response.data.toast);
          console.log(ctl.toast);
      }).finally(function() {
          ctl.execution = false;
      });
  }
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

//users.controller
/**
 * Fill users view with users data.
 *
 * @param  object $routeParams   Parameters passed by Url
 * @param  object $scope         Object that refers to the application model.
 * @param  object $location      Angular path service
 * @param  object $routeParams   Parameters passed by Url
 * @param  object authentication Authentication service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("usersCtrl",["$routeParams", "$scope","$location", "userData", "appUtilities" ,function($routeParams, $scope,$location, userData, appUtilities){
  var ctl = this;


  appUtilities.setTitle("COW Administration panel - Users");

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
            ctl.toast = appUtilities.createToast(error.toast);
          });
          ctl.toast = appUtilities.createToast(data.toast);
      })
      .error(function (error) {
          ctl.toast = appUtilities.createToast(error.toast);
      });
  };

  //Get users data function
  userData.getAllUsers()
    .success(function(data) {
      $scope.users = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });
}]);

//appUtilities.service
angular.module('cowApp').service('appUtilities', ['$window', function($window){
   var setTitle = function(title){
     $window.document.title = title;
   };

   var createToast = function(params){
     return{
             status  : params.status,
             message : params.message
           }
   }

   return {
     setTitle    : setTitle,
     createToast : createToast
   };
}]);

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
    saveToken   : saveToken,
    getToken    : getToken,
    isLoggedIn  : isLoggedIn,
    login       : login,
    logout      : logout
  };
}]);

//designData.service
angular.module('cowApp').service('designData', ['$http', 'authentication', function($http, authentication){

   var getDocument = function(type){
     return $http.get('/api/getDocument', {
       headers: {
         Authorization: 'Bearer '+ authentication.getToken(),
       },
       params: {
           "documentType": type
       }
     });
   };

   var saveDocument = function(type, content){
     return $http.get('/api/saveDocument', {
       headers: {
         Authorization: 'Bearer '+ authentication.getToken(),
       },
       params: {
           "documentType": type,
           "documentContent": content
       }
     });
   };

   return {
     getDocument  : getDocument,
     saveDocument : saveDocument
   };
}]);

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

  var createEmail = function(vTo, vSubject, vText, vHtml){
    return {
       to      :  vTo,
       subject :  vSubject,
       text    :  vText,
       html    :  vHtml
    }
  }

  return {
     getMailParameters  : getMailParameters,
     setMailParameters  : setMailParameters,
     sendMail           : sendMail,
     createEmail        : createEmail
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
    };

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
    };

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

//SETTINGS

angular.module("cowApp").directive("generalsettings", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/settings.general.view.html",
      controller: "stGeneralCtrl as stGeneralCtl"
  }
});

angular.module("cowApp").directive("mailingsettings", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/settings.mailing.view.html",
      controller: "stMailingCtrl as stMailingCtl"
  }
});

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

//# sourceMappingURL=main.js.map
