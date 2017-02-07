//vm is the controller alias
(function () {

  angular.module('meanApp').controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];


    /**
     * Try to register a new user in database
     *
     * @param  object $location Angular path location
     * @param  object authentication Authentication service object
     *
     */
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    //On form submit add input data to variables and try to register the user.
    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication.register(vm.credentials).error(function(err){
          alert(err);
        }).then(function(){
          $location.path('profile');
        });
    };

  }

})();
