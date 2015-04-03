(function() {
    'use strict';
    angular
        .module('app.cl')
        .filter('VersionCheck', VersionCheck);

    function VersionCheck() {
		return function(input, xyz){
        	return ((input) ? '\u2713'+input:'\u2718'+'--Failed--');
    	};
    }   // end function 
})();