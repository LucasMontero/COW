//navigation.directive -> See also navigation.controller
angular.module("cowApp").directive("navigation", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/navigation.view.html",
      controller: "navigationCtrl as navCtl"
  }
});

//sidebar.directive -> See also sidebar.controller
angular.module("cowApp").directive("sidebar", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/sidebar.view.html",
      controller: "sidebarCtrl as sideCtl"
  }
});

//toast.directive
angular.module("cowApp").directive("toast", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/toast.view.html",
      controller: ""
  }
});

//codemirror.directive
angular.module("cowApp").directive("codemirror", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/codemirror.view.html",
      controller: "codemirrorCtrl as cmCtl"
  }
});

//SETTINGS

angular.module("cowApp").directive("generalsettings", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/settings.general.view.html",
      controller: "stGeneralCtrl as stGeneralCtl"
  }
});

angular.module("cowApp").directive("mailingsettings", function(){
  return {
      restrict: "EA",
      templateUrl: "/views/adm/directives/settings.mailing.view.html",
      controller: "stMailingCtrl as stMailingCtl"
  }
});
