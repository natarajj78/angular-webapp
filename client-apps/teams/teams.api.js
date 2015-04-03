(function() {
'use strict';
	angular
	.module('app.ts')
	.factory('Api', Api);
	/* @ngInject */
	function Api($http, $q, $resource) {
    return {
      User: $resource('/api/user/:_id', {_id: '@_id'}, {}),
      Team: $resource('/api/team/:_id', {_id: '@_id'}, {}),
      Sprint: $resource('/api/sprint/:_id', {_id: '@_id'}, {}),
      Release: $resource('/api/release/:_id', {_id: '@_id'}, {})
    };
	};
})();