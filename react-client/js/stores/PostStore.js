var AppDispatcher = require('../dispatcher/AppDispatcher');
var BlogWebAPIUtil = require('../utils/BlogWebAPIUtil');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var marked = require('marked');

var _posts = [];
var _pageSize = 0;
var _currentPage = 0;
var _hasMore = false;
var _total = 0;


var PostStore = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return _posts;
	},
	
	getCurrentPage: function() {
		return _currentPage;
	},

	getPageSize: function() {
		return _pageSize;
	},
	
	hasMore: function() {
		return _hasMore;
	},

	total: function() {
		return _total;
	},
	
	parseMarkdownPost: function (content) {
		return marked(content);
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
		case 'RECEIVE_ALL_POSTS':
			_currentPage = action.currentPage;
			_pageSize = action.pageSize;
			_posts = action.posts;
			_hasMore = action.hasMore;
			_total = action.total;
			PostStore.emitChange();
			break;
		case 'UPDATE_POSTS':
			BlogWebAPIUtil.getAllPosts(_currentPage, _pageSize);
			break;
	}
});


module.exports = PostStore;
