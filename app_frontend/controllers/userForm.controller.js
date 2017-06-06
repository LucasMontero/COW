//editUser.controller
/**
 * Edit a specific user by id
 *
 * @param  object $routeParams  Parameters passed by url
 * @param  object $location     Angular path service
 * @param  object userData      userData service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("userFormCtrl",["$scope", "$routeParams", "$location", "userData", "mailData", "appUtilities" ,function($scope, $routeParams ,$location, userData, mailData, appUtilities){
  var ctl = this;

  ctl.credentials = {
    name : "",
    email : "",
    password : ""
  };

  if($routeParams.userId){
    appUtilities.setTitle("COW Administration panel - Edit User");

    ctl.isEdit = true;

    userData.getUser($routeParams.userId)
      .success(function(data) {
        ctl.credentials = data;
      })
      .error(function (error) {
        ctl.toast = appUtilities.createToast(error.toast);
      });
  }
  else{
    appUtilities.setTitle("COW Administration panel - New User");

    ctl.isEdit = false;
  }


  //On form submit try to update the user
  $scope.saveUser = function () {
    ctl.execution = true;
    if (ctl.isEdit) {
      console.log('Submitting update');
      userData.updateUser($routeParams.userId, ctl.credentials).error(function(error){
        ctl.toast = appUtilities.createToast(error.toast);
        ctl.execution = false;
      }).then(function(response){
        //Add toast
        exit(response.data.toast);

      });
    }else{

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

            exit(response.data.toast);      
      });
    }
 }

 $scope.close = function() {
   $location.path('/cow-adm/users');
 };

 function exit(toast){
   appUtilities.setToast(toast);
   $location.path('/cow-adm/users');
 }

}]);
