(function() {

  //Creates homeCrtl controller
  angular.module('meanApp').controller('homeCtrl', homeCtrl);

    /*
     * Shows in log if controller is running
     */
    function homeCtrl () {
      console.log('Home controller is running');
    }

})();
