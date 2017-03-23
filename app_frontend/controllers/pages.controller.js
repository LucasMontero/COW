//pages.controller
/**
 * Fill pages view with pages data.
 *
 * @param  object $scope         Object that refers to the application model.
 * @param  object $location      Angular path service
 * @param  object $routeParams   Parameters passed by Url
 * @param  object pageData       pageData service object
 * @param  object titlePage      titlePage service object
 *
 */
angular.module("cowApp").controller("pagesCtrl",["$routeParams", "$scope","$location", "pageData", "titlePage" ,function($routeParams, $scope,$location, pageData, titlePage){
  var ctl = this;

  titlePage.setTitle("COW Administration panel - Pages");

  //Get users data function
  pageData.getAllPages()
    .success(function(data) {
      $scope.pages = data;
    })
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message
      }
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
}]);
