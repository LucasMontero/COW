//newPage.controller
/**
 * Try to register a new page in database
 *
 * @param  object $location   Angular path location
 * @param  object pageData    pageData service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("pageFormCtrl",["$scope", "$location", "$routeParams", "pageData", "mailData", "appUtilities", function($scope, $location, $routeParams,pageData, mailData, appUtilities){
  //ctl is the controller alias
  var ctl = this;

  ctl.exit = false;

  ctl.pageForm = {
    title   : "",
    path    : "",
    content : "",
    header  : false,
    footer  : false,
    index   : false,
    public  : false
   };

  if($routeParams.pageId){
    appUtilities.setTitle("COW Administration panel - Edit Page");

    ctl.isEdit = true;

    pageData.getPageById($routeParams.pageId)
      .success(function(data) {
        ctl.pageForm = data;
      })
      .error(function (error) {
        ctl.toast = appUtilities.createToast(error.toast);
      });
  }else{
    appUtilities.setTitle("COW Administration panel - New Page");

    ctl.isEdit = false;
  }

  //On form submit try to create a new page.
  $scope.saveAndExit = function() {
    ctl.exit = true;
    populatePage();
  };


  $scope.saveAndStay = function() {
    populatePage();
  };

  $scope.close = function() {
    $location.path('/cow-adm/pages');
  };

  function populatePage(){
    ctl.pageForm.header = document.getElementById('header').checked;
    ctl.pageForm.footer = document.getElementById('footer').checked;
    ctl.pageForm.index  = document.getElementById('index').checked;
    ctl.pageForm.public = document.getElementById('public').checked;

    if(ctl.isEdit){
      console.log('Updating page');
      pageData.updatePage($routeParams.pageId, ctl.pageForm).error(function(error){
              ctl.toast = appUtilities.createToast(error.toast);
        }).then(function(response){
              checkExit(null, response.data.toast);
        });
    }else{
      console.log('Submitting creation');
      pageData.createPage(ctl.pageForm)
        .error(function(error){
            ctl.toast = appUtilities.createToast(error.toast);
        })
        .then(function(response){
            var subject = "New page";
            var text    = "A new page has been created";
            var html    = "<p>A new page has been created</p>";

            var mail     = mailData.createEmail(null, subject, text, html);

            mailData.sendMail(mail);

            checkExit(response.data[0].id, response.data[1].toast);
        });
    }
  }

  function checkExit(pageId, toast){
    if (ctl.exit || !ctl.isEdit) {
      appUtilities.setToast(toast);

      if (ctl.exit) {
        $location.path('/cow-adm/pages');
      }else if(!ctl.isEdit){
        $location.path("/cow-adm/pages/editPage/"+pageId)
      }
    }

    ctl.toast = appUtilities.createToast(toast);
  }
}]);
