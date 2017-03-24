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
