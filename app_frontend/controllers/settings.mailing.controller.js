/**
 * Build the parameters and fuctions used in settings.mailing.view
 *
 * @param  object titlePage  titlePage path location
 * @param  object mailData   maildata service object
 *
 */
angular.module('cowApp').controller('stMailingCtrl', ['titlePage', 'mailData', function(titlePage, mailData){
  //ctl is the controller alias
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Mailing Settings");

  ctl.mailTo = "";

  //Get users data function
  mailData.getMailParameters()
    .success(function(data) {
      ctl.mailForm = data;
    })
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message
      }
    });

  //On form submit try to register the user.
  ctl.onSubmit = function(){
    console.log('Setting mail parameters');

    ctl.mailForm.secure = document.getElementById('secure').checked;

    mailData.setMailParameters(ctl.mailForm)
      .error(function(error){
          ctl.toast = {
            status  : error.toast.status,
            message : error.toast.message
          }
          console.log(ctl.toast);
      }).then(function(response){
          ctl.toast = {
            status  : response.data.toast.status,
            message : response.data.toast.message
          }
          console.log(ctl.toast);
      });
  };

  //Try to send a mail to passed mail direction with saved parameters
  ctl.onTestMail = function(){
    console.log('Testing mail parameters');

    var mail = {};
    mail.to = ctl.mailTo;
    mail.subject = "Test Message";
    mail.text = "This is a test message from cow administration panel";
    mail.html = "<p>This is a test message from cow administration panel</p>";

    mailData.sendMail(mail)
      .error(function(error){
          ctl.toast = {
            status  : error.toast.status,
            message : error.toast.message
          }
          console.log(ctl.toast);
      }).then(function(response){
          ctl.toast = {
            status  : response.data.toast.status,
            message : response.data.toast.message
          }
          console.log(ctl.toast);
      });
  }

}]);
