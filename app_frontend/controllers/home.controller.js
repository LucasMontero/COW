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
