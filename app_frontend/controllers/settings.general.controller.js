/**
 * Build the parameters and functions used in settings.mailing.view
 *
 * @param  object appUtilities  appUtilities service object
 * @param  object generalData   generalData  service object
 *
 */
angular.module('cowApp').controller('stGeneralCtrl', ['appUtilities', 'generalData', function(appUtilities, mailData){
  //ctl is the controller alias
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - General Settings");

  ctl.mainteance

  mailData.getGeneralParameters()
    .success(function(data) {
      ctl.mailForm = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });

  //On form submit try to register the user.
  ctl.onSubmit = function(){
    ctl.execution = true;
    console.log('Setting general parameters');

    generalData.setGeneralParameters(ctl.mailForm)
      .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
          console.log(ctl.toast);
      }).then(function(response){
          ctl.toast = appUtilities.createToast(response.data.toast);
          console.log(ctl.toast);
      }).finally(function(){
          ctl.execution = false;
      });
  };

}]);
