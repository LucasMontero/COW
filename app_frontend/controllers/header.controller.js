//navigation.controller -> See also navigation.service
/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 *
 */
angular.module('cowApp').controller('headerCtrl', ['$scope', '$window', '$location', 'authentication', function($scope, $window, $location, authentication){
  //ctl is the controller alias
  var ctl = this;

  //Check if user is authenticated and if it is, shows the current user.
  ctl.isLoggedIn  = authentication.isLoggedIn();
  ctl.currentUser = authentication.currentUser();

  $scope.onCheck = function(qId){
      ctl.responsiveShow = $scope.responsive[qId];
      $scope.$emit('responsiveMenu', $scope.responsive[qId]);
  }

  angular.element($window).bind('resize', function(){
    if ($window.innerWidth > 1080) {
      $scope.$emit('responsiveMenu', false);
    }
  });

  /**
   * Delete the user session on the browser
   */
  $scope.logout = function(){
    authentication.logout();
    $location.path('/');
  };


}]);
