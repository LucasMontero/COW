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
