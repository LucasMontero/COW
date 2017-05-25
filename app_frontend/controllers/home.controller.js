//home.controller
/**
 * Shows in log if controller is running
 *
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("homeCtrl",["appUtilities", function(appUtilities){
  appUtilities.setTitle("COW Administration panel");
}]);
