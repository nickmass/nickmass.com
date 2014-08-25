(function () {
	function BlogService ($http) {
		this.getPosts = function() {
			return $http.get('/api/posts').then(function(res) {
				return res.data;
			});
		};
	}

	angular.module('app').service('BlogService', BlogService);
})();
