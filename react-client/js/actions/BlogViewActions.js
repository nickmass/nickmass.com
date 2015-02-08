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
		BlogWebAPIUtil.createPost(post, { currentPage: PostStore.getCurrentPage(), pageSize: PostStore.getPageSize()});
		AppDispatcher.handleViewAction({
			type: 'HIDE_COMPOSE_POST'
		});
	},
	
	deletePost: function(post) {
		BlogWebAPIUtil.deletePost(post, {currentPage: PostStore.getCurrentPage(), pageSize: PostStore.getPageSize()});
	},

	editPost: function(post) {
		BlogWebAPIUtil.editPost(post);
	},
	
	hideComposePost: function () {
		AppDispatcher.handleViewAction({
			type: 'HIDE_COMPOSE_POST'
		});
	},

	composePost: function() {
		AppDispatcher.handleViewAction({
			type: 'COMPOSE_POST'
		});
	}
};
