//toast.controller
/**
 * Add bootstrap angular functions to toast
 *
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("toastCtrl",[ "$scope", function($scope, $modalInstance){
      $scope.closeModal = function(){
         console.log("asd");
         $modalInstance.close();
      }
}]);
