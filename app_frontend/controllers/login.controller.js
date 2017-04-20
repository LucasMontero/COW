//Authentication - login.controller
/**
 * Try to login the user with passed credentials
 *
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("loginCtrl",['$location', "authentication", "mailData", "appUtilities",function($location, authentication, mailData, appUtilities) {
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

    ctl.recoverPassword = function () {
       var to      = ctl.fpEmail;
       var subject = "Recover Password";
       var text    = "Your new password is ***. Remenber to changue it after login.";
       var html    = "<p>Your new password is ***. Remenber to changue it after login.</p>";

       var mail     = mailData.createEmail(to, subject, text, html);

       mailData.sendMail(mail);
    };

}]);
