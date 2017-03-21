//Profile - profile.controller
/**
 * Try to get user data
 *
 * @param  object $routeParams    Parameters passed by Url
 * @param  object $location       Angular path location
 * @param  object userData        data.service.js service object
 * @param  object titlePage     titlePage service object
 *
 */
angular.module("cowApp").controller("profileCtrl",["$routeParams", "$location", "userData", "titlePage" ,function($routeParams, $location, userData, titlePage){
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Profile");

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
