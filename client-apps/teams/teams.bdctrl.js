(function() {
    'use strict';
    angular
        .module('app.ts')
        .controller('BurndownController', BurndownController);
	
    function BurndownController($filter) {
    	/* jshint validthis: true */
    	var bd = this;
        /**
    	bd.$parent.$watch('selectedSprint', function () {
        	var sprint = bd.$parent.selectedSprint;
        	if (!sprint) { return; }
        	sprint.charts = sprint.charts || {};
        	sprint.charts.burndown = sprint.charts.burndown || $filter('burndownChart')(sprint);
      	});**/
    };// end function 
})();

