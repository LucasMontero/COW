//appUtilities.service
angular.module('cowApp').service('appUtilities', ['$window', function($window){

  this.toast = null;

   var setTitle = function(title){
     $window.document.title = title;
   };

   var createToast = function(params){
     return{
             status  : params.status,
             message : params.message
           }
   };

   var setToast = function(data){
     this.toast = data;
   };

   var getToast = function(){
     if (this.toast != null) {
       var tmp = this.createToast(this.toast);
       this.toast = null;
       return tmp;
     }
     return null;
   };

   return {
     setTitle    : setTitle,
     createToast : createToast,
     setToast    : setToast,
     getToast    : getToast
   };
}]);
