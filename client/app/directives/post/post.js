(function() {
	var Post = function() {
		return {
			restrict: 'E',
			templateUrl: 'app/directives/post/post.html',
			scope: {
				post: '=model'
			}
		};
	};

	angular.module('app').directive('myPost', Post);
})();
