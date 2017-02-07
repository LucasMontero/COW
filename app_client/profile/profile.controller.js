(function(){
  //Creates profileCtrl controller
  angular.module('meanApp').controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData'];

  /**
   * Try to get user data
   *
   * @param  object $location Angular path location
   * @param  object meanData  data.service.js service object
   *
   */
  function profileCtrl($location, meanData) {
    var vm = this;

    vm.user = {};

    //Get user data function
    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }
})();
