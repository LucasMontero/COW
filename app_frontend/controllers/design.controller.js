//design.controller
/**
 *
 * @param  object $scope          Object that refers to the application model.
 * @param  object desingData      desingData service object
 * @param  object appUtilities    appUtilities service object
 *
 */
angular.module('cowApp').controller('designCtrl', ['$scope', 'designData', 'appUtilities', function($scope, designData, appUtilities){
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - Design");

  $scope.menuItems = [['Css', 'css'], ['Javascript', 'javascript'], ['Header', 'xml'], ['Footer', 'xml']];

  designData.getDocument('Css')
    .success(function(data) {
        ctl.design.content = data;
    })
    .error(function (error) {
        ctl.toast = appUtilities.createToast(error.toast);
    });

  ctl.design = {};

  $scope.activeMenu = $scope.menuItems[0];

  $scope.setActive = function(menuItem) {
    $scope.activeMenu = menuItem;

    designData.getDocument(menuItem[0])
      .success(function(data) {
          ctl.design.content = data;
      })
      .error(function (error) {
          ctl.toast = appUtilities.createToast(error.toast);
      });
  }

  //On form submit try to save the document
  ctl.onSubmit = function () {
    ctl.execution = true;
    console.log('Submitting update');
    designData.saveDocument($scope.activeMenu[0], ctl.design.content)
      .error(function(error){
          ctl.toast = appUtilities.createToast(error.toast);
      })
      .then(function(response){
          ctl.toast = appUtilities.createToast(response.data.toast);
     }).finally(function() {
          ctl.execution = false;
     });;
  };
}]);
