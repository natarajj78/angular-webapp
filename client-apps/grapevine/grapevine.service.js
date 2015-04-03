(function() {
'use strict';
	angular
	.module('app.grapevine')
	.factory('grapevineService', grapevineService);
	/* @ngInject */
	function grapevineService($http, $q, UTILS) {
    var api = {},
      grapevine;

    api.codeTypes = [
      { name: 'jsp', selected: false},
      { name: 'assets', selected: false},
      { name: 'clientlibs', selected: false},
      { name: 'configs', selected: false},
      { name: 'mappings', selected: false},
      { name: 'bundles', selected: false},
      { name: 'jar-libs', selected: false},
      { name: 'tests', selected: false},
      { name: 'other', selected: false}
    ];

    api.artifactTypes = [
      { name: 'bundles', selected: false},
      { name: 'code', selected: false},
      { name: 'dm', selected: false},
      { name: 'frameworkAssets', selected: false},
      { name: 'frameworkDesigns', selected: false},
      { name: 'frameworkContent', selected: false},
      { name: 'homepage', selected: false}
    ];

    api.newBranch = {
      'branchType': 'feature',
      'branchName': '',
      'upstreamBranch': 'develop',
      'featureWiki': '',
      'mingleCard': '',
      'featureDevLeads': '',
      'featurePM': '',
      'notificationEmail': '',
      /*'targetRelease': '',*/
      'codeAffected': '',
      /*'artifactsNeeded': '',*/
      'osgiBundle': 'no',
      'testScope': ''
    };

    api.jobStatus = function () {
      var deferred = $q.defer();
      $http.get('/api/jenkins/job/create-branch/api/json').then(function (body) {

        grapevine = (grapevine || body.data);

        body.data.builds.forEach(function (build) {
          var item = UTILS.findOne(grapevine.builds, function (item) { return item.number === build.number; });
          if (!item) {
            //grapevine.builds.pop();
            grapevine.builds.unshift(build);
          }
        });

        deferred.resolve(grapevine);
      }, function (reason) {
        console.log(reason);
        deferred.reject(reason);
      });
      return deferred.promise;
    };

    api.buildDetails = function (build) {
      $http.get('/api/jenkins/job/create-branch/' + build.number + '/api/json').then(function (body) {
        build.details = body.data;
      }, function (reason) {
        console.log(reason);
      });
    };
    return api;
	};
})();