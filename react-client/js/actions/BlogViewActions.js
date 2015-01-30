var AppDispatcher = require('../dispatcher/AppDispatcher');
var BlogWebAPIUtil = require('../utils/BlogWebAPIUtil');
var PostStore = require('../stores/PostStore');

module.exports = {
	nextPage: function() {
		var page = PostStore.getCurrentPage() + 1;
		var pageSize = PostStore.getPageSize();
		BlogWebAPIUtil.getAllPosts(page, pageSize);
	},

	prevPage: function() {
		var page = PostStore.getCurrentPage() - 1;
		var pageSize = PostStore.getPageSize();
		BlogWebAPIUtil.getAllPosts(page, pageSize);
	},

	createPost: function(post) {
		BlogWebAPIUtil.createPost(post);
		AppDispatcher.handleViewAction({
			type: 'UPDATE_POSTS'
		});
	}
};
