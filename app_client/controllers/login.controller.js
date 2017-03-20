//Authentication - login.controller
/**
 * Try to login the user with passed credentials
 *
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 * @param  object titlePage     titlePage service object
 *
 */
angular.module("cowApp").controller("loginCtrl",['$location', "authentication", "titlePage",function($location, authentication, titlePage) {
    //ctl is the controller alias
    var ctl = this;

    titlePage.setTitle("COW Administration panel - Login");

    ctl.credentials = {
      email : "",
      password : ""
    };

    //On form submit add input data to credentials variables and try to login with them.
    ctl.onSubmit = function () {
      authentication.login(ctl.credentials)
        .error(function(error){
          ctl.toast = {
            status  : error.toast.status,
            message : error.toast.message
          }
        })
        .then(function(){
          $location.path('/cow-adm/home');
        });
    };
}]);
