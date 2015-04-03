(function() {
    'use strict';
    angular
        .module('app.releaseactivityreport')
        .service('relactivityReportService', relactivityReportService);
	
    function relactivityReportService($http,$q) {
  	    var _root = '/api/relactivities';

        this.list = function () {
            return $http.get(_root);
        };

        this.create = function (relActivity) {
            return $http.post(_root + '/create', relActivity);
        };

        this.remove = function (relActivity) {
            return $http.delete(_root + '/remove/' + relActivity._id);
        };

        this.edit = function (relActivity) {
            return $http.put(_root + '/edit/' + relActivity._id, relActivity);
        };
    }   // end function 
})();