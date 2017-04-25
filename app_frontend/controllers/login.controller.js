//Authentication - login.controller
/**
 * Try to login the user with passed credentials
 *
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("loginCtrl",['$location', "authentication", "userData", "appUtilities",function($location, authentication, userData, appUtilities) {
    //ctl is the controller alias
    var ctl = this;

    appUtilities.setTitle("COW Administration panel - Login");

    ctl.credentials = {
      email : "",
      password : ""
    };

    ctl.fpEmail = "";

    //On form submit add input data to credentials variables and try to login with them.
    ctl.login = function () {
      authentication.login(ctl.credentials)
        .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
        })
        .then(function(){
          $location.path('/cow-adm/home');
        });
    };

    ctl.recoverUserPassword = function () {
       ctl.execution = true;
       userData.recoverUserPassword(ctl.fpEmail)
         .error(function(error){
            ctl.toast = appUtilities.createToast(error.toast);
         })
         .then(function(response){
            ctl.toast = appUtilities.createToast(response.data.toast);
         })
         .finally(function(){
           ctl.execution = false;
         });
    };

}]);
