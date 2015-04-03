(function() {
    'use strict';
    angular
        .module('app.cb')
        .service('codebeaconService', codebeaconService);
	
    function codebeaconService($http,$q) {
  	    var _root = '/api/codebeacons';

        this.list = function () {
            return $http.get(_root);
        };

        this.create = function (codebeacon) {
            return $http.post(_root + '/create', codebeacon);
        };

        this.remove = function (codebeacon) {
            return $http.delete(_root + '/remove/' + codebeacon._id);
        };

        this.edit = function (codebeacon) {
            return $http.put(_root + '/edit/' + codebeacon._id, codebeacon);
        };
    }   // end function 
})();