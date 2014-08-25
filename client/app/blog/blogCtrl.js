(function () {
	function BlogCtrl (BlogService, $scope) {
		var self = this;
		BlogService.getPosts().then(function(data) {
			self.posts = data;
		});
	}

	angular.module('app').controller('BlogCtrl', BlogCtrl);
})();
