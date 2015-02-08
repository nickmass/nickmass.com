var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PostFormatter = require('../utils/PostFormatter').format;

var _composePost = false;
var _post = {
	id: null,
	content: '',
	title: '',
	new: true
};

var PostComposerStore = assign({}, EventEmitter.prototype, {
	getPost: function() {
		return _post;
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

PostComposerStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
		case 'COMPOSE_POST':
			_post = {
				id: null,
				content: '',
				title: '',
				new: true
			};
			PostComposerStore.emitChange();
			break;
		case 'EDIT_POST':
			_post = {
				id: action.post.id,
				title: action.post.title,
				content: action.post.content,
				new: false
			};
			PostComposerStore.emitChange();
		default:
	}
});


module.exports = PostComposerStore;
