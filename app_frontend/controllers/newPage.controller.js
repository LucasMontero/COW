//newPage.controller
/**
 * Try to register a new page in database
 *
 * @param  object $location   Angular path location
 * @param  object pageData    pageData service object
 * @param  object appUtilities     appUtilities service object
 *
 */
angular.module("cowApp").controller("newPageCtrl",["$location", "pageData", "mailData", "appUtilities", function($location, pageData, mailData, appUtilities){
  //ctl is the controller alias
  var ctl = this;

  appUtilities.setTitle("COW Administration panel - New Page");

  ctl.isEdit = false;

  ctl.pageForm = {
    title   : "",
    path    : "",
    content : "",
    header  : false,
    footer  : false,
    index   : false,
    public  : false
   };

  //On form submit try to register the user.
  ctl.onSubmit = function () {
    console.log('Submitting creation');

    ctl.pageForm.header = document.getElementById('header').checked;
    ctl.pageForm.footer = document.getElementById('footer').checked;
    ctl.pageForm.index  = document.getElementById('index').checked;
    ctl.pageForm.public = document.getElementById('public').checked;

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
          //Add toast
          console.log(response.data.toast.message)
          $location.path('/cow-adm/pages');
      });
  };
}]);
