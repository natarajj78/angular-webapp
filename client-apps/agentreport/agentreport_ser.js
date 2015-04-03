(function() {
    'use strict';
    angular
        .module('app.ar')
        .service('agentService', agentService);
	
    function agentService($http,$q) {
  	    var _root = '/api/agents';

        this.list = function () {
            return $http.get(_root);
        };

        this.create = function (agent) {
            return $http.post(_root + '/create', agent);
        };

        this.remove = function (agent) {
            return $http.delete(_root + '/remove/' + agent._id);
        };

        this.edit = function (agent) {
            return $http.put(_root + '/edit/' + agent._id, agent);
        };
    }   // end function 
})();