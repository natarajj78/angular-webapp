(function() {
    'use strict';
    angular
        .module('app.cb')
        .controller('codebeaconCtrl',codebeaconCtrl);
	
    function codebeaconCtrl(codebeaconService) {
    	/* jshint validthis: true */
    	var cb     = this;
    	cb.loading = false;
    	cb.agentRowView=[];
    	
    	cb.init 			   = init;
    	cb.changeAgentRowValue = changeAgentRowValue; 
    	cb.createOrUpdate      = createOrUpdate;
    	cb.remove              = remove;
    	cb.setBeacon           = setBeacon;
    	cb.errFn               = errFn;
    	
        //  #####  Function callls #####
    	function init() {
        	cb.loading = true;
        	cb.beacons = undefined;	
        	codebeaconService.list().then(function (response) {
            	cb.beacons = response.data;
            	cb.loading = false;
        		}, cb.errFn);
    	}; // cb.init ends here
    	function changeAgentRowValue(index) {
        	cb.agentRowView[index] = !cb.agentRowView[index];
    	}; //cb.changeAgentRowValue
    	
    	function createOrUpdate(beacon) {
        	if (beacon._id) {
            	codebeaconService.edit(beacon).
                	then(function () {
                    	cb.init();
                    	cb.beacon = undefined;
                	}, cb.errFn);
        	} else {
            codebeaconService.create(beacon).
                then(function () {
                    cb.init();
                    cb.beacon = undefined;
                }, cb.errFn);
        	}
    	}; //cb.createOrUpdate 
    	
    	function remove(beacon) {
        	beacon.removing = true;
        	codebeaconService.remove(beacon).
            	then(function () {
                	cb.init();
            	}, cb.errFn);
    	}; //cb.remove
    	
    	function setBeacon(currentBeacon) {
        	cb.beacon = currentBeacon;
    	};
    	
    	function errFn(){
	    	var errFn = function (reason) { cb.error = reason; console.dir(reason); };
    	}
    	
    	// Initializing the function ..
    	cb.init();
    }   // end function 
})();