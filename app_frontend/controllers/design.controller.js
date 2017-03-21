//design.controller
/**
 *
 * @param  object $scope          Object that refers to the application model.
 *
 */
angular.module('cowApp').controller('designCtrl', ['$scope', '$location', 'designData', function($scope, $location, designData){
  var ctl = this;

  $scope.menuItems = [['Css', 'css'], ['Javascript', 'javascript'], ['Header', 'xml'], ['Footer', 'xml']];

  designData.getDocument('Css')
    .success(function(data) {
        ctl.design.content = data;
    })
    .error(function (error) {
      ctl.toast = {
        status  : error.toast.status,
        message : error.toast.message
      }
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
        ctl.toast = {
          status  : error.toast.status,
          message : error.toast.message
        }
      });
  }

  //On form submit try to save the document
  ctl.onSubmit = function () {
    console.log('Submitting update');
    designData.saveDocument($scope.activeMenu[0], ctl.design.content)
      .error(function(error){
          ctl.toast = {
            status  : error.toast.status,
            message : error.toast.message
          }
      })
      .then(function(response){
          ctl.toast = {
            status  : response.data.toast.status,
            message : response.data.toast.message
      }
    });
  };
}]);
