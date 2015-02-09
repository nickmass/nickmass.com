var PostFormatter = require('../utils/PostFormatter').format;

var createStore = require('fluxible/utils/createStore');

var PostStore = createStore({
	storeName: 'PostStore',

	initialize: function(dispatcher) {
		this.posts = [];
		this.pageSize = 10;
		this.currentPage = 1;
		this.hasMore = false;
		this.total = 0;
	},
	
	handlers: {
		RECIEVE_POST_PAGE: 'handlePageChange'
	},

	handlePageChange: function(payload) {
		this.total = payload.total;
		this.posts = payload.items.map(function(post){ return PostFormatter(post);});
		this.hasMore = payload.hasMore;
		this.pageSize = payload.pageSize;
		this.currentPage = payload.page;
		this.emitChange();
	},
	
	getState: function() {
		return {
			total: this.total,
			hasMore: this.hasMore,
			pageSize: this.pageSize,
			currentPage: this.currentPage,
			posts: this.posts
		};
	},

	dehydrate: function() {
		return this.getState();
	},

	rehydrate: function(state) {
		this.total = state.total;
		this.posts = state.posts;
		this.hasMore = state.posts;
		this.pageSize = state.pageSize;
		this.currentPage = state.currentPage;
	}
});

module.exports = PostStore;
