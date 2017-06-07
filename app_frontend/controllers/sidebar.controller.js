//sidebar.controller -> See also sidebar.service
/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 *
 */
angular.module('cowApp').controller('sidebarCtrl', ['$scope', '$window', '$location', 'authentication', function($scope, $window, $location, authentication){
  //ctl is the controller alias
  var ctl = this;

  menuOnScreenSize();

  ctl.menuView  =  function(){
    switch (true) {
      case /home/.test($location.$$path):
        return "home";
        break;
      case /pages/.test($location.$$path):
        return "pages";
        break;
      case /multimedia/.test($location.$$path):
        return "multimedia";
        break;
      case /plugins/.test($location.$$path):
        return "plugins";
        break;
      case /design/.test($location.$$path):
        return "design";
        break;
      case /users/.test($location.$$path):
        return "users";
        break;
      case /settings/.test($location.$$path):
        return "settings";
        break;
    }
  }

  $scope.$on('responsiveMenu', function(event, data) {
      ctl.responsiveMenu = data;
  });

  angular.element($window).bind('resize', function(){
    menuOnScreenSize();
    $scope.$apply();
  });

  function menuOnScreenSize(){
    if ($window.innerWidth > 1080) {
      ctl.responsiveMenu = true;
    }else{
      ctl.responsiveMenu = false;
    }
  }
}]);
