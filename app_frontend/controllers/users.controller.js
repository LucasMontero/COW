//users.controller
/**
 * Fill users view with users data.
 *
 * @param  object $routeParams   Parameters passed by Url
 * @param  object $scope         Object that refers to the application model.
 * @param  object $location      Angular path service
 * @param  object $routeParams   Parameters passed by Url
 * @param  object authentication Authentication service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("usersCtrl",["authentication", "$routeParams", "$scope","$location", "userData", "appUtilities" ,function(authentication, $routeParams, $scope,$location, userData, appUtilities){
  var ctl = this;


  appUtilities.setTitle("COW Administration panel - Users");


  $scope.$on('userToast', function(event, args) {
      console.log("dentro");
      ctl.toast = args;
  });
  /**
   * Delete a specific user by id and reload the users list
   *
   * @param  string userId Id of the user that will be deleted
   *
   */
  $scope.deleteUser = function(userId) {
    if (authentication.currentUser()._id === userId) {
      var toast = {
              "status" : "error",
              "message": "Mother of cow! You can't delete your own user."
        };
      ctl.toast = appUtilities.createToast(toast);
    }else{
      userData.deleteUser(userId).success(function(data) {
          userData.getAllUsers()
            .success(function(data) {
              $scope.users = data;
            })
            .error(function (error) {
              ctl.toast = appUtilities.createToast(error.toast);
            });
            ctl.toast = appUtilities.createToast(data.toast);
        })
        .error(function (error) {
            ctl.toast = appUtilities.createToast(error.toast);
        });
    }
  };

  //Get users data function
  userData.getAllUsers()
    .success(function(data) {
      $scope.users = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });
}]);
