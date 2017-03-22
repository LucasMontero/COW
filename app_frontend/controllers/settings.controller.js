/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 *
 */
angular.module('cowApp').controller('settingsCtrl', ['$scope', 'titlePage', function($scope, titlePage){
  //ctl is the controller alias
  var ctl = this;

  $scope.menuItems = [["General", 1], ["Mail", 2], ["IP Ban", 3], ["Limit Login", 4]];

  $scope.activeMenu = $scope.menuItems[0];

  $scope.setActive = function(menuItem) {
    $scope.activeMenu = menuItem;
  }
}]);
