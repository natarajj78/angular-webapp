(function() {
    'use strict';
    angular
        .module('app.releaseactivityreport')
        .controller('relactivityReportCtrl', relactivityReportCtrl);
	
    function relactivityReportCtrl(relactivityReportService) {
    	/* jshint validthis: true */
    	var rars     = this;
    	rars.loading = false;
    	rars.agentRowView=[];
    	
    	rars.init 			   = init;
    	rars.changeAgentRowValue = changeAgentRowValue; 
    	rars.createOrUpdate      = createOrUpdate;
    	rars.remove              = remove;
    	rars.setActivity         = setActivity;
    	rars.errFn               = errFn;
    	
        //  #####  Function callls #####
    	function init() {
        	rars.loading = true;
        	rars.releaseactivities = undefined;	
        	relactivityReportService.list().then(function (response) {
            	rars.releaseactivities = response.data;
            	rars.loading = false;
        		}, rars.errFn);
    	}; // ar.init ends here
    	function changeAgentRowValue(index) {
        	rars.agentRowView[index] = !rars.agentRowView[index];
    	}; //ar.changeAgentRowValue
    	
    	function createOrUpdate(activity) {
        	if (activity._id) {
            	relactivityReportService.edit(activity).
                	then(function () {
                    	rars.init();
                    	rars.activity = undefined;
                	}, rars.errFn);
        	} else {
            relactivityReportService.create(activity).
                then(function () {
                    rars.init();
                    rars.activity = undefined;
                }, rars.errFn);
        	}
    	}; //ar.createOrUpdate 
    	
    	function remove(activity) {
        	activity.removing = true;
        	relactivityReportService.remove(activity).
            	then(function () {
                	rars.init();
            	}, rars.errFn);
    	}; //ar.remove
    	
    	function setActivity(currentActivity) {
    		//console.log( currentActivity);
        	rars.activity = currentActivity;
    	};
    	
    	function errFn(){
	    	var errFn = function (reason) { rars.error = reason; console.dir(reason); };
    	}
    	
    	// Initializing the function ..
    	rars.init();
    }   // end function 
})();