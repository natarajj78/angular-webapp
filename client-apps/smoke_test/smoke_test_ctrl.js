(function() {
    'use strict';
    angular
        .module('app.smoketest')
        .controller('smokeTestCtrl', smokeTestCtrl );

	//smokeTestCtrl.$inject = [ '$routeParams', 'smokeTestList' ];
	
    function smokeTestCtrl($routeParams, smokeTestList) {
    	/* jshint validthis: true */
        var st = this;
        // cq environments.......
        st.sandbox = $routeParams.sandbox;
        st.envlist  = [
            {
                name: "localhost",
                list: [
                    {"host":'http://localhost:4502/',"alias":"localhost" , "username":"admin", "password": "admin" }
                ]
            },
            {
                name: "dev",
                list: [
                    {"host":'http://wemapp-author-dev3-01:4502/',   "alias":"wemapp-author-dev3-01" ,   "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-author-dev3-02:4502/',   "alias":"wemapp-author-dev3-02" ,   "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-dev3-01:4503/',  "alias":"wemapp-publish-dev3-01" ,  "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-dev3-02:4503/',  "alias":"wemapp-publish-dev3-02" ,  "username":"admin", "password": "admin"}
                ]
            },
            {
                name: "lt",
                list: [
                    {"host":'http://wemapp-author-lt3-01:4502/',   "alias":"wemapp-author-lt3-01" ,   "username":"admin", "password": "admin" },
                    {"host":'http://wemapp-author-lt3-02:4502/',   "alias":"wemapp-author-lt3-02" ,   "username":"admin", "password": "admin" },
                    {"host":'http://wemapp-publish-lt3-01:4503/',  "alias":"wemapp-publish-lt3-01" ,  "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-lt3-02:4503/',  "alias":"wemapp-publish-lt3-02" ,  "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-lt4-01:4503/',  "alias":"wemapp-publish-lt4-01" ,  "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-lt4-02:4503/',  "alias":"wemapp-publish-lt4-02" ,  "username":"admin", "password": "admin"}
                ]
            },
            {
                name: "stage",
                list: [
                    {"host":'http://wemapp-author-stage3-01:4502/',  "alias":"wemapp-author-stage3-01" ,  "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-author-stage3-02:4502/',  "alias":"wemapp-author-stage3-02" ,  "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-stage3-01:4503/', "alias":"wemapp-publish-stage3-01" , "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-stage3-02:4503/', "alias":"wemapp-publish-stage3-02" , "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-stage4-01:4503/', "alias":"wemapp-publish-stage4-01" , "username":"admin", "password": "admin"},
                    {"host":'http://wemapp-publish-stage4-02:4503/', "alias":"wemapp-publish-stage4-02" , "username":"admin", "password": "admin"}
                ]
            }
        ];
        //$scope.data = smokeTestList.query();
        st.bundles = smokeTestList.get({sandbox: $routeParams.sandbox}, function(bundles) {});

    }   // end function 
})();