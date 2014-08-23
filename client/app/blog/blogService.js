(function () {

	function BlogService () {
		this.getPosts = function() {
			return ['Hello 1', 'Hello 2', 'Hello 3', 'Hello 4'];
		};
	}

	angular.module('app').service('BlogService', BlogService);

})();
