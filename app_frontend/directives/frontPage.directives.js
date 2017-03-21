//cowheader.directive
angular.module("cowApp").directive("cowheader", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/front/directives/header.view.html",
      controller: ""
  }
});

//cowfooter.directive
angular.module("cowApp").directive("cowfooter", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/front/directives/footer.view.html",
      controller: ""
  }
});
