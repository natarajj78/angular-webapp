(function() {
    'use strict';
    angular
        .module('app.ts')
        .filter('sumByKey', sumByKey);
	
    function sumByKey() {
      return function (cards) {
        if (cards === undefined) { return undefined; }
        var stories = _.where(cards, {'Type': 'Story'}),
          stories_points = sumByKey(stories, 'Effort Points'),
          bars = [],
          blocked = sumByKey(_.where(stories, {'Simple Status': 'Blocked'}), 'Effort Points'),
          done = sumByKey(_.where(stories, {'Simple Status': 'Dev Done'}), 'Effort Points'),
          accepted =  sumByKey(_.where(stories, {'Simple Status': 'Accepted'}), 'Effort Points'),
          remainder = 100;

        blocked = Math.floor(blocked / stories_points * 100);
        done = Math.floor(done / stories_points * 100);
        accepted = Math.floor(accepted / stories_points * 100);

        remainder = remainder - blocked - done - accepted;

        bars.push({value: remainder, type: 'warning'});
        bars.push({value: blocked, type: 'danger'});
        bars.push({value: done, type: 'info'});
        bars.push({value: accepted, type: 'success'});

        return bars;
      };
    }   // end function 
})();

