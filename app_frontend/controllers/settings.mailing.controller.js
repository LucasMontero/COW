/**
 * Build the parameters and functions used in settings.mailing.view
 *
 * @param  object appUtilities  appUtilities service object
 * @param  object mailData      maildata service object
 *
 */
angular.module('cowApp').controller('stMailingCtrl', ['appUtilities', '$scope','mailData', function(appUtilities, $scope ,mailData){
  //ctl is the controller alias
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Mailing Settings");

  ctl.mailTo = "";

  mailData.getMailParameters()
    .success(function(data) {
      ctl.mailForm = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });

  //On form submit try to register the user.
  ctl.onSubmit = function(){
    ctl.execution = true;
    console.log('Setting mail parameters');

    ctl.mailForm.secure = document.getElementById('secure').checked;

    mailData.setMailParameters(ctl.mailForm)
      .error(function(error){
          $scope.$emit('createToast', appUtilities.createToast(error.toast));
      }).then(function(response){
          $scope.$emit('createToast', appUtilities.createToast(response.data.toast));
      }).finally(function(){
          ctl.execution = false;
      });
  };

  //Try to send a mail to passed mail direction with saved parameters
  ctl.onTestMail = function(){
    ctl.execution = true;
    console.log('Testing mail parameters');

    var subject = "Test Message";
    var text    = "This is a test message from cow administration panel";
    var html    = "<p>This is a test message from cow administration panel</p>";

    var mail     = mailData.createEmail(ctl.mailTo, subject, text, html);

    mailData.sendMail(mail)
      .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
          console.log(ctl.toast);
      }).then(function(response){
          ctl.toast = appUtilities.createToast(response.data.toast);
          console.log(ctl.toast);
      }).finally(function() {
          ctl.execution = false;
      });
  }
}]);
