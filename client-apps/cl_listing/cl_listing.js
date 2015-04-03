(function() {
    'use strict';
    angular
        .module('app.cl')
        .controller('clListCtrl', clListCtrl);

	//clListCtrl.$inject=['$routeParams','$http','$templateCache'];
	
    function clListCtrl($routeParams, $http, $templateCache) {
    	/* jshint validthis: true */
    	var cl = this;
    	
		if(angular.isUndefined(cl.serverLocation)){
            cl.serverLocation = 'http://wikibot.cisco.com:3015/docsAndTests/';   
        }else{
            cl.serverLocation = cl.serverLocation;
        }
        
        cl.method = 'JSONP';   
        var url =  cl.serverLocation+'cmpListService.cgi?callback=JSON_CALLBACK'; 
        //"http://wikibot.cisco.com:3015/docsAndTests/cmpDescListService.cgi?callback=getjson"
        cl.code        = null;
        cl.response    = null; 
        cl.change      = change;
        cl.callService = callService;
        cl.showDesc    = showDesc;
        
        
        $http({method: cl.method, url: url, cache: $templateCache}).
            success(function(data, status) {
            cl.status = status;
            cl.data = data;
        }).
        error(function(data, status) {
            cl.data = data || "Request failed";
            cl.status = status;
        }); 

        //  #####  Function callls #####
        function change(){
            cl.$watch('serverLocation', callService);
        };
        function callService(){
            var url = cl.serverLocation+'cmpListService.cgi?callback=JSON_CALLBACK';
            $http({method: cl.method, url: url, cache: $templateCache}).
                success(function(data, status) {
                    cl.status = status;
                    cl.data = data;
                    console.log(cl.data);
                }).
                error(function(data, status) {
                    cl.data = data || "Request failed";
                    cl.status = status;
            }); 
        }; // end call service..
        function showDesc( val ){
            cl.id = val;
            var url1   = cl.serverLocation+"cmpDescListService.cgi?callback=JSON_CALLBACK&id="+val;
            cl.code     = null;
            cl.response = null;
            cl.data1    = $http({method: "JSONP", url: url1, cache: $templateCache}).
                success(function(data1, status) {
                    cl.data1 =  data1;
                }).
                error(function(data1, status) {
                    return cl.data1;
            });
        };   // end showDesc 
    }   // end function 
})();