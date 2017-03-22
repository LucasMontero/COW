/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 *
 */
angular.module('cowApp').controller('stMailingCtrl', ['titlePage', 'mailData', function(titlePage, mailData){
  //ctl is the controller alias
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Mailing Settings");

  //GET MAIL PARAMETERS

  ctl.mailForm = {
    host      : "",
    port      : "",
    secure    : false,
    username  : "",
    password  : ""
   };

  //On form submit try to register the user.
  ctl.onSubmit = function () {
    console.log('Setting mail parameters');

    ctl.mailForm.secure = document.getElementById('mailSecure').checked;

    mailData.setMailParameters(ctl.mailForm).error(function(error){
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message
        }
    }).then(function(response){
        ctl.toast = {
          status  : response.data.toast.status,
          message : response.data.toast.message
        }
    });
  };

  //ON MAIL TEST

}]);
