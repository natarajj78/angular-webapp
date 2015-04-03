(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/componentlisting',
                config: {
                    templateUrl: 'src/client/app/cl_listing/componentlisting.html'
                }
            }
        ];
    }
})();