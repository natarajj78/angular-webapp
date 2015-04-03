(function() {
    'use strict';
    angular
        .module('app.cl')
        .filter('ActiveCheck', ActiveCheck);

    function ActiveCheck() {
    	return function(input) {
        	return ((input==='Active' ||  input==='Fragment' ) ? '\u2713' + input  : '\u2718'+input+'--Failed--' );
    	};
    }   // end function 
})();