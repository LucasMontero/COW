/**
 * Build the parameters and fuctions used in navigation.view
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object $location       Angular path location
 * @param  object authentication  Authentication service object
 *
 */
angular.module('cowApp').controller('mailingCtrl', ['titlePage', 'mailData', function(titlePage, mailData){
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
    console.log('Saving mailing parameters');

    //ctl.mailForm.secure = document.getElementById('mailSecure').checked;

    /*saveMailParameters().error(function(error){
        //Add toast
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message
        }
    }).then(function(response){
        //Add toast
        console.log(response.data.toast.message)
        $location.path('/cow-adm/settings/mailing');
    }); */
  };

  //ON MAIL TEST

}]);
