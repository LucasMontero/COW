/**
 * Try to register a new user in database
 *
 * @param  object $location   Angular path location
 * @param  object userData    userData service object
 * @param  object titlePage     titlePage service object
 *
 */
angular.module("cowApp").controller("newUserCtrl",["$location", "userData", "titlePage", function($location, userData, titlePage){
  //ctl is the controller alias
  var ctl = this;

  titlePage.setTitle("COW Administration panel - New User");

  ctl.isEdit = false;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  //On form submit try to register the user.
  ctl.onSubmit = function () {
    console.log('Submitting creation');
    userData.createUser(ctl.credentials).error(function(error){
        //Add toast
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message
        }
    }).then(function(response){
        //Add toast
        console.log(response.data.toast.message)
        $location.path('/cow-adm/users');
    });
  };
}]);
