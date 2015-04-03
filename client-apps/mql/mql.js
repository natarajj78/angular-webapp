(function() {
    'use strict';
    angular
        .module('app.mql')
        .controller('mqlCtrl', mqlCtrl);

	//clListCtrl.$inject=['$routeParams','$http','$templateCache'];
	
    function mqlCtrl( $http) {
    	/* jshint validthis: true */
    	var mq = this;
    	mq.init = init;
    	mq.executeMQL = executeMQL;
    	
    	// Functions 
    	function init() {
        	mq.url = 'http://cardbot.cisco.com:8080/api/v2/projects/leopard_spots/cards/execute_mql.json';
        	mq.mql = "SELECT number, name, type, status, 'Simple Status', 'Developer - ID', 'Powner', 'Hours Remaining', 'Hours Estimate'";
        	mq.mql = mq.mql + " WHERE 'Sprint Planning - Sprint' = NUMBER 9167";
       	};  // End init function 
       	 
      	function executeMQL(url, mql) {
        	//logger.debug('executeMQL', 'url, mql');
			console.log( url);
			console.log("<br/>");
			console.log( mql);
			
        	url = url + '?mql=' + encodeURIComponent(mql);
        	url = url + '&callback=JSON_CALLBACK';
			
			console.log( url );
       	 	$http.jsonp(url).
          		success(function (response) {
            	//logger.debug('executeMQL', 'request success');
            	mq.queryResults = response;
          	}).
          	error(function (reason) {
            	//logger.warn('executeMQL', 'request failed', reason);
            	mq.response = reason;
          	});
      	};
      	
      	mq.init();
    }   // end function 
})();