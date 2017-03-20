//titlePage.service
angular.module('cowApp').service('titlePage', ['$window', function($window){
   var setTitle = function(title){
     $window.document.title = title;
   };

   return {
     setTitle: setTitle
   };
}]);
