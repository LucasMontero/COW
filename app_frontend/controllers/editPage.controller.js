
//editPage.controller
/**
 * Edit a specific page by id
 *
 * @param  object $scope         Object that refers to the application model.
 * @param  object $routeParams   Parameters passed by url
 * @param  object $location      Angular path service
 * @param  object pageData       pageData service object
 * @param  object $routeParams   Parameters passed by Url
 * @param  object appUtilities      appUtilities service object
 *
 */
angular.module("cowApp").controller("editPageCtrl",["$scope", "$routeParams", "$location", "pageData", "appUtilities" ,function($scope, $routeParams ,$location, pageData, appUtilities){
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Edit Page");

  ctl.isEdit = true;

  ctl.pageForm = {};

  pageData.getPageById($routeParams.pageId)
    .success(function(data) {
      ctl.pageForm = data;
    })
    .error(function (error) {
      ctl.toast = appUtilities.createToast(error.toast);
    });

  //On form submit try to update de user
  ctl.onSubmit = function () {
    console.log('Updating page');
    ctl.pageForm.header = document.getElementById('header').checked;
    ctl.pageForm.footer = document.getElementById('footer').checked;
    ctl.pageForm.index  = document.getElementById('index').checked;
    ctl.pageForm.public = document.getElementById('public').checked;

    pageData.updatePage($routeParams.pageId, ctl.pageForm).error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
    }).then(function(response){
          //Add toast
          console.log(response.data.toast.message)
          $location.path('/cow-adm/pages');
    });
  };

}]);
