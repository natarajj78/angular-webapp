(function() {
    'use strict';
    angular
        .module('app.releaseactivityreport')
        .filter('prjTypeCheck', prjTypeCheck);

    function prjTypeCheck() {
    	return function (input, rtype, pid) {
      		if (rtype === "1" && pid === 0) { return input + "-ARNP"; }
      		if (rtype === "1" && pid > 0) { return input + "-A"; }
      		return input + "-F";
    	};
    }   // end function 
})();