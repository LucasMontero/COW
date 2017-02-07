//vm is the controller alias
(function () {

  //Create navigationCtrl controller
  angular.module('meanApp').controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication'];

  /**
   * Check if user is authenticated and if it is, shows the current user.
   *
   * @param  object $location Angular path location
   * @param  object authentication Authentication service object
   *
   */
  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

  }

})();
