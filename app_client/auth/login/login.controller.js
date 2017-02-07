//vm is the controller alias

(function (){

  angular.module('meanApp').controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];

  /**
   * Try to login the user with passed credentials
   *
   * @param  object $location Angular path location
   * @param  object authentication Authentication service object
   *
   */
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    //On form submit add input data to credentials variables and try to login with them.
    vm.onSubmit = function () {
      authentication.login(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }

})();
