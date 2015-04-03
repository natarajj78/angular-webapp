(function() {
    'use strict';
    angular
        .module('app.rdj')
        .controller('rdjsonCtrl', rdjsonCtrl);
	
    function rdjsonCtrl() {
    	/* jshint validthis: true */
    	var rd = this;
    	rd.languages = [        
        	{name:"English", value:0},
        	{name:"Spanish", value:1},
        	{name:"German", value:3},
        	{name:"Russian", value:2},
        	{name:"Korean", value:1}
    	];
    }   // end function 
})();