//users.controller
/**
 * Fill users view with users data.
 *
 * @param  object $routeParams   Parameters passed by Url
 * @param  object $scope         Object that refers to the application model.
 * @param  object $location      Angular path service
 * @param  object $routeParams   Parameters passed by Url
 * @param  object authentication Authentication service object
 * @param  object titlePage     titlePage service object
 *
 */
angular.module("cowApp").controller("usersCtrl",["$routeParams", "$scope","$location", "userData", "titlePage" ,function($routeParams, $scope,$location, userData, titlePage){
  var ctl = this;


  titlePage.setTitle("COW Administration panel - Users");

  /**
   * Delete a specific user by id and reload the users list
   *
   * @param  string userId Id of the user that will be deleted
   *
   */
  $scope.deleteUser = function(userId) {
    userData.deleteUser(userId)
      .success(function(data) {
        userData.getAllUsers()
          .success(function(data) {
            $scope.users = data;
          })
          .error(function (error) {
            ctl.toast = {
              status  : error.toast.status,
              message : error.toast.message
            }
          });
          ctl.toast = {
            status  : data.toast.status,
            message : data.toast.message
          }
      })
      .error(function (error) {
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message
        }
      });
  };

  //Get users data function
  userData.getAllUsers()
    .success(function(data) {
      $scope.users = data;
    })
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message
      }
    });
}]);
