/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 *
 */
angular.module('cowApp').controller('stGeneralCtrl', ['titlePage', function(titlePage, mailData){
  //ctl is the controller alias
  var ctl = this;

  titlePage.setTitle("COW Administration panel - General Settings");

}]);
