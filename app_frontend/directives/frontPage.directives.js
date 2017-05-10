//cowheader.directive
angular.module("cowApp").directive("frontheader", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/front/directives/header.view.html",
      controller: ""
  }
});

//cowfooter.directive
angular.module("cowApp").directive("frontfooter", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/front/directives/footer.view.html",
      controller: ""
  }
});
