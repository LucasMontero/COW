//codemirror.controller
/**
 * Set codemirror editor options
 *
 * @param  object $scope          Object that refers to the application model.
 *
 */
angular.module('cowApp').controller('codemirrorCtrl', ['$scope', function($scope){
  // The modes 'css', 'xml', 'javascript';

  $scope.initMode = "xml"
 
 // The ui-codemirror options
 $scope.cmOptions = {
   lineNumbers: true,
   htmlMode: true,
   smartIndent: true,
   indentWithTabs: true,
   theme : 'material',
   onLoad : function(_cm){
     // HACK to have the codemirror instance in the scope...
     $scope.setMode = function(mode){
       _cm.setOption("mode", mode);
     };

     $scope.setMode($scope.initMode);
   }
 };
}]);
