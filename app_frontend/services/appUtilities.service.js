//appUtilities.service
angular.module('cowApp').service('appUtilities', ['$window', function($window){
  
   var setTitle = function(title){
     $window.document.title = title;
   };

   var createToast = function(params){
     return{
             status  : params.status,
             message : params.message
           }
   }

   var toast = {};


   return {
     setTitle    : setTitle,
     createToast : createToast
   };
}]);
