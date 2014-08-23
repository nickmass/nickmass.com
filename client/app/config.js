(function() {
	function config ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'app/blog/blog.html',
			controller: 'BlogCtrl',
			controllerAs: 'blog'
		});
	};

	angular.module('app').config(config);
})();
