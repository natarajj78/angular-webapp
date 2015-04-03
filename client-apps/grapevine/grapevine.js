(function() {
    'use strict';
    angular
        .module('app.cl')
        .controller('grapevineCtrl', grapevineCtrl);
	
    function grapevineCtrl($http, $timeout, grapevineService) {
    	/* jshint validthis: true */
    	var gv = this;
    	gv.codeTypes     = grapevineService.codeTypes;
    	gv.artifactTypes = grapevineService.artifactTypes;
    	gv.newBranch     = grapevineService.newBranch;

    	gv.alerts = [];

    	gv.closeAlert = function (index) {
      		gv.alerts.splice(index, 1);
   		};

      var poll_period = 1000 * 10,
        jobStatus = function () {
          grapevineService.jobStatus().then(function (data) {
            gv.jobStatus = data;
          });
          $timeout(jobStatus, poll_period);
        };
      $timeout(jobStatus);


      gv.grapevineBuildDetails = function (build) {
        console.log(build);
        grapevineService.buildDetails(build);
      };

      gv.createBranch = function () {
        var artifactsNeeded = [],
          codeAffected = [];

        /* set newBranch object with settings from */
        gv.artifactTypes.forEach(function (type) {
          if (type.selected) {
            artifactsNeeded.push(type.name);
          }
        });
        gv.newBranch.artifactsNeeded = artifactsNeeded.join(",");

        /* set newBranch object with settings from */
        gv.codeTypes.forEach(function (type) {
          if (type.selected) {
            codeAffected.push(type.name);
          }
        });
        gv.newBranch.codeAffected = codeAffected.join(",");

        $http({
          method: 'POST',
          url: '/api/git/createBranch',
          data: $.param(gv.newBranch),
          headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
        }).
          success(function (data) {
            console.info("Grapevine: attempting to create feature branch");
            console.dir(data);
            //$location.hash('top');
            //$anchorScroll();
            //window.scrollTo(window.pageXOffset, window.pageYOffset - 400);
            if (data.error === true) {
              gv.alerts.push({ type: 'danger', msg: 'There was an issue creating your feature branch. Please try again.' });
            } else {
              gv.alerts.push({ type: 'info', msg: 'Your request to create ' + gv.newBranch.branchName + ' has been received. Usually takes around 5 minutes.' });
            }
            gv.accordionOpen = false;
          }).
          error(function (error) {
            console.log('error');
            gv.alerts.push({ type: 'danger', msg: 'There was an issue creating your feature branch. Please try again.' });
            console.dir(error);
          });
      };
    }   // end function 
})();