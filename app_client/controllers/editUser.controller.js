//editUser.controller
/**
 * Edit a specific user by id
 *
 * @param  object $routeParams  Parameters passed by url
 * @param  object $location     Angular path service
 * @param  object userData      userData service object
 * @param  object titlePage     titlePage service object
 *
 */
angular.module("cowApp").controller("editUserCtrl",["$routeParams", "$location", "userData", "titlePage" ,function($routeParams ,$location, userData, titlePage){
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Edit User");

  ctl.isEdit = true;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  userData.getUser($routeParams.userId)
    .success(function(data) {
      ctl.credentials = data;
    })
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message
      }
    });

  //On form submit try to update the user
  ctl.onSubmit = function () {
    console.log('Submitting update');
    userData.updateUser($routeParams.userId, ctl.credentials).error(function(error){
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
