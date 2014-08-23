(function () {
	function BlogCtrl (BlogService) {
		this.posts = BlogService.getPosts();
	}

	angular.module('app').controller('BlogCtrl', BlogCtrl);
})();
