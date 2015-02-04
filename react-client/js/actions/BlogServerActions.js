var AppDispatcher = require('../dispatcher/AppDispatcher');
var BlogWebAPIUtil = require('../utils/BlogWebAPIUtil');


module.exports = {
	receiveAllPosts: function(currentPage, pageSize, posts, hasMore, total) {
		AppDispatcher.handleServerAction({
			type: 'RECEIVE_ALL_POSTS',
			currentPage: currentPage,
			pageSize: pageSize,
			posts: posts,
			hasMore: hasMore,
			total: total
		});
	},
}
