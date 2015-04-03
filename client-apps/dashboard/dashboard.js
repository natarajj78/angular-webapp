(function() {
    'use strict';
    angular
        .module('app.dashboard')
        .controller('dashboardCtrl', dashboardCtrl);

	//clListCtrl.$inject=['$routeParams','$http','$templateCache'];
	
    function dashboardCtrl() {
    	/* jshint validthis: true */
    	var db = this;
    	db.setTheme = setTheme;
    	
    	function setTheme(theme) {
        	db.theme = theme;
	    };
    }   // end function 
})();