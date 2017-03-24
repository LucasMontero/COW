/**
 * Try to register a new user in database
 *
 * @param  object $location   Angular path location
 * @param  object userData    userData service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("newUserCtrl",["$location", "userData", "mailData", "appUtilities", function($location, userData, mailData, appUtilities){
  //ctl is the controller alias
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - New User");

  ctl.isEdit = false;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  //On form submit try to register the user.
  ctl.onSubmit = function () {
      ctl.execution = true;
      console.log('Submitting creation');

      userData.createUser(ctl.credentials)
        .error(function(error){
            ctl.toast = appUtilities.createToast(error.toast);
            ctl.execution = false;
        }).then(function(response){
            var subject = "New user";
            var text    = "A new user with name "+ ctl.credentials.name +" & email "+ctl.credentials.email+" has been created.";
            var html    = "<p>A new user with name "+ ctl.credentials.name +" & email "+ctl.credentials.email+" has been created.</p>";

            var mail     = mailData.createEmail(null, subject, text, html);

            mailData.sendMail(mail);

            //Add toast
            console.log(response.data.toast.message)

            $location.path('/cow-adm/users');
      });
  };
}]);
