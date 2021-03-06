
//frontPageCtrl.controller
/**
 * Cronstruct the front page of the application
 *
 * @param  object appUtilities     appUtilities service object
 * @param  object $location     Angular path service
 * @param  object pageData      pageData service object
 *
 */
angular.module("cowApp").controller("frontPageCtrl",["appUtilities", "pageData", "$location", "$scope", "$sce", function(appUtilities, pageData, $location, $scope, $sce){
  //controller alias
  var ctl = this;

  if($location.path() === '/'){
    pageData.getIndexPage()
     .success(function(data) {
         setPage(data);
      })
      .error(function (error) {
          $location.path('/500');
      });
  }else{
    pageData.getPageByPath($location.path())
     .success(function(data) {
          if (data.length === 1) {
              setPage(data);
          }else{
              $location.path('/404');
          }
      })
      .error(function (error) {
          $location.path('/500');
      });
  }

  var setPage = function(data){
    ctl.pageData = data[0];
    appUtilities.setTitle(ctl.pageData.title);
    $scope.content = $sce.trustAsHtml(ctl.pageData.content);
  }

}]);
