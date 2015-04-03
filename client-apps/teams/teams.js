(function() {
    'use strict';
    angular
        .module('app.ts')
        .controller('teamsCtrl', teamsCtrl);
	
    function teamsCtrl(Api,MingleApi) {
    	/* jshint validthis: true */
    	var ts = this;
		  ts.init = function () {
      		//logger.debug("init", "void");
      		ts.loadApi();
    	};
    	ts.loadApi = function () {
      		//logger.debug("loadApi", "void");
      		Api.Team.query(function (teams) {
        		ts.teams = teams;	
        		teams.forEach(function (team) {
          			MingleApi.query(team.backlog).
            		success(function (response) {
              			team.backlogCards = response;
            		});

          		team.sprints.forEach(function (sprint) {
           			MingleApi.query(sprint.mql).
              		success(function (response) {
                		sprint.cards = response;
                		sprint.charts = {
                  			progress: $filter('progressBars')(sprint.cards)
                		};
              		});
          		});
        		});
      		});
    	};
		
    	ts.setSprint = function (team, sprint) {
      		//logger.debug("setSprint", "sprint: {0}", [sprint.name]);
     	 	  ts.selectedSprint = sprint;
      		ts.selectedTeam = team;
   	 	};
    	ts.init();
    }   // end function 
})();

