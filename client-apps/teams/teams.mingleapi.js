(function() {
'use strict';
	angular
	.module('app.ts')
	.factory('MingleApi', MingleApi);
	/* @ngInject */
	function MingleApi($http, $q) {
		var service = {};
    	service.getProjectUrl = function (project_name) {
      		project_name = project_name || 'leopard_spots';
      		var url = 'http://cardbot.cisco.com:8080';
      		url = url + '/api/v2/projects/' + project_name.toLowerCase();
      		url = url + '/cards/execute_mql.json';
      		return url;
    	};

    	service.query = function (url, mql) {
      		mql = mql || url;
        	url = mql === url ? service.getProjectUrl() : url;
      		return $http.jsonp(url + '?mql=' + encodeURIComponent(mql) + '&callback=JSON_CALLBACK');
    	};
    	return service;
	};
})();