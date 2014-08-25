(function() {
	var settings = {
			appUrl: 'http://nodeblog.nickmass.com'
	};
	
	function config ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'app/blog/blog.html',
			controller: 'BlogCtrl',
			controllerAs: 'blog'
		});
	};
	
	angular.module('app').constant('AppSettings', settings);
	angular.module('app').config(config);
})();
