(function() {
    'use strict';
    angular
        .module('app.sg')
        .controller('styleCtrl', styleCtrl);
	
    function styleCtrl() {
    	/* jshint validthis: true */
    	var sg     = this;
    	sg.themes  = [
        'default', 'amelia', 'cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly',
        'journal', 'lumen', 'readable', 'simplex', 'slate', 'spacelab', 'superhero',
        'united', 'yeti'];

    }   // end function 
})();

