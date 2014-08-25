(function() {
	var Trusted = function($sce) {
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	};

	angular.module('app').filter('trusted', Trusted);
})();
