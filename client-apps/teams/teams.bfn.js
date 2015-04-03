(function() {
    'use strict';
    angular
        .module('app.ts')
        .filter('beforeNowByKey', beforeNowByKey);
	
    function beforeNowByKey() {
      return function (data, key) {
        if (data === undefined || key === undefined) {
          return undefined;
        }
        return _.filter(data, function (item) {
          return new Date(item[key]) < new Date();
        });
      };
    }   // end function 
})();

