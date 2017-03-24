//pages.controller
/**
 * Fill pages view with pages data.
 *
 * @param  object $scope         Object that refers to the application model.
 * @param  object $location      Angular path service
 * @param  object $routeParams   Parameters passed by Url
 * @param  object pageData       pageData service object
 * @param  object appUtilities      appUtilities service object
 *
 */
angular.module("cowApp").controller("pagesCtrl",["$routeParams", "$scope","$location", "pageData", "appUtilities" ,function($routeParams, $scope,$location, pageData, appUtilities){
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Pages");

  //Get users data function
  pageData.getAllPages()
    .success(function(data) {
      $scope.pages = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });
  /**
   * Delete a specific page by id and reload the pages list
   *
   * @param  string userId Id of the user that will be deleted
   *
   */
  $scope.deletePage = function(pageId) {
    pageData.deletePage(pageId)
      .success(function(data) {
        pageData.getAllPages()
          .success(function(data) {
            $scope.pages = data;
          })
          .error(function (error) {
            ctl.toast = appUtilities.createToast(error.toast);
          });
          ctl.toast = appUtilities.createToast(data.toast);
      })
      .error(function (error) {
        ctl.toast = appUtilities.createToast(error.toast);
      });
  };
}]);
