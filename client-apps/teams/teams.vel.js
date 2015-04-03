(function() {
    'use strict';
    angular
        .module('app.ts')
        .filter('velocity', velocity);
	
    function velocity() {
      return function (sprints) {
        if (sprints === undefined) {
          return undefined;
        }
        var velocity = 0;
        sprints.forEach(function (sprint) {
          var opts = {
            'Simple Status': 'Accepted',
            'Type': 'Story'
          },
            effort_point_items = _.pluck(_.where(sprint.cards, opts), 'Effort Points');

          effort_point_items.forEach(function (item) {
            velocity = velocity + _.parseInt(item);
          });

        });
        return Math.floor(velocity / sprints.length);
      };
    }   // end function 
})();

