(function() {
    'use strict';
    angular
        .module('app.hookomator')
        .controller('hookomatorCtrl', hookomatorCtrl);
	
    function hookomatorCtrl($scope, $http, $timeout, jenkins) {
    	/* jshint validthis: true */
     $http({method: 'GET', url: '/api/git/mergeReport'}).
      success(function (data) {
        $scope.unlockedBranches = data.branches;
      });

    $http({method: 'GET', url: '/api/git/branches'}).
      success(function (data) {
        console.dir(data);
        $scope.allBranches = data.branches;
      });

    var poll_period = 1000 * 10,
      jobStatus = function () {
        console.info("hookomatorCtrl");

        jenkins.hookomatorJobStatus(function () {
          console.log("Hookomator status");
        });
        /*
        jenkins.hookomatorJobStatus().then(function (result) {
          console.log("Hookomator status" + result);
        });*/
        $timeout(jobStatus, poll_period);
      };
    $timeout(jobStatus);

    $scope.lockBranch = function (branch) {
      if (!branch) { return; }
      var url = '/api/hookomator/lock/' + branch.name;
      console.log("HTTP GET req : " + url);
      $http.get(url).
        success(function () {
          console.log("Hookomator Jenkins job running: lock " + branch.name);
        });
    };
    $scope.unlockBranch = function (branch) {
      if (!branch) { return; }
      var url = '/api/hookomator/unlock/' + branch.name;
      console.log("HTTP GET req : " + url);
      $http.get(url).
        success(function (result) {
          console.log("Hookomator Jenkins job running: unlock " + branch.name);
          console.log(result.stdout);

          jobStatus();

        });
    };

    }   // end function 
})();