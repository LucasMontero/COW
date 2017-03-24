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
