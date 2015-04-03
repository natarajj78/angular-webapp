(function() {
    'use strict';
    angular
        .module('app.ts')
        .filter('orderByKey', orderByKey);
	
    function orderByKey() {
      return function (data, key, reverse) {
        if (data === undefined) { return undefined; }
        var filtered = [];
        data.forEach(function (item) {
          filtered.push(item);
        });
        filtered.sort(function (a, b) {
          return (a[key] > b[key] ? 1 : -1);
        });
        if (reverse) { filtered.reverse(); }
        return filtered;
      };
    }   // end function 
})();

