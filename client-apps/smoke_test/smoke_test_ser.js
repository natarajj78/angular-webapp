(function() {
    'use strict';
angular
    .module('app.smoketest')
    .service('smokeTestList', smokeTestList);
    
    //smokeTestList.$inject = ['$resource'];
    
    function smokeTestList($resource) {
	    return $resource('../angular-webapp/data/data_bundles.json', {}, {
            query: {method:'GET', params:{sandbox:'sanbbox'}, isArray:false}
        });
    } // end service smokeTestList..
})();
