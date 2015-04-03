(function() {
    'use strict';
    angular
        .module('app.mergereport')
        .controller('mergeReportCtrl', mergeReportCtrl);
	
    function mergeReportCtrl($scope, $http, $sce) {
    	/* jshint validthis: true */
    $scope.alerts = [];

    $scope.init = function () {

      $scope.branchConflicts = [];
      $scope.branchMergeOk = [];
      $scope.branchUpToDate = [];

      $http({method: 'GET', url: '/api/git/mergeReport'}).
        success(function (data) {
          data.branches.forEach(function (branch) {
            var status = branch.merge_attempt.status;
            if (status === 'conflicts') {
              branch.conflicts = [];
              branch.commit_history = branch.commit_history.stdout.join('\n');
              branch.merge_attempt.merge.forEach(function (mergeItem) {
                branch.conflicts.push({conflict : mergeItem});
              });
              $scope.branchConflicts.push(branch);
            }
            if (status === 'up-to-date') { $scope.branchUpToDate.push(branch); }
            if (status === 'no-conflict') { $scope.branchMergeOk.push(branch); }
          });
          $scope.branches = data.branches;
          $scope.version_date = data.version.date;
        });

    };
    $scope.init();

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.showMerge = function (branch) {
      branch.merge_attempt.show = (branch.merge_attempt.show === undefined ? true : !branch.merge_attempt.show);
    };

    var mySplit = function (string) {
        $scope.array = string.split('/');
        $scope.result = $scope.array[$scope.array.length - 1];
        return $scope.result;
      };

    $scope.getHtml = function (branch, conflict) {
      if (!conflict.conflictReport) {
        var path = "/api/git/mergeReport/conflict/id/mergereport/" + branch.name + mySplit(conflict.conflict) + ".html";
        $http({method: 'GET', url: path}).
          success(function (data) {
            conflict.conflictReport = $sce.trustAsHtml(data);
          }).
          error(function () {
            conflict.conflictReport = 'Error loading page!';
          });
      }
    };

    $scope.backmergeDevelop = function (branch) {
      if (!branch) { return; }
      console.log(branch);
      $http({
        method: 'POST',
        url: '/api/git/backmergeDevelop',
        data: $.param(branch),
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
      }).
        success(function (data) {
          console.dir(data);
          branch.selectionDisabled = true;
          //branch.status = "Develop branch merge to feature in progress";
          $scope.alerts.push({ type: 'info', msg: 'Merge develop branch to ' + branch.name + ' in progress' });
        }).
        error(function (error) {
          console.log('error');
          //branch.status = "Develop branch merge to feature failed, please retry.";
          $scope.alerts.push({ type: 'danger', msg: 'Merge develop branch to ' + branch.name + ' failed, please retry.' });
          console.dir(error);
        });
    };
    }   // end function 
})();