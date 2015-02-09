var createStore  = require('fluxible/utils/createStore');
var PostFormatter = require('../utils/PostFormatter').formatContent;

var PostComposerStore = createStore({
	storeName: 'PostComposerStore',
	initialize: function(dispatcher) {
		this.id = null;
		this.content = '';
		this.title = '';
		this.new = true;
		this.htmlContent = '';
		this.refreshEvent = function() {};
	},
	
	handleComposePost: function(payload) {
		this.id = null;
		this.content = '';
		this.title = '';
		this.new = true;
		this.htmlContent = '';
		this.refreshEvent = payload.refreshEvent;
		this.emitChange();
	},
	handleEditPost: function(payload) {
		this.new =false;
		this.id = payload.id;
		this.content = payload.content;
		this.title = payload.title;
		this.htmlContent = PostFormatter(this.content);
		this.refreshEvent = payload.refreshEvent;
		this.emitChange();
	},
	
	handlers: {
		COMPOSE_POST: 'handleComposePost',
		EDIT_POST: 'handleEditPost'
	},

	getState: function () {
		return {
			id: this.id,
			content: this.content,
			title: this.title,
			new: this.new,
			htmlContent: PostFormatter(this.content),
			refreshEvent: this.refreshEvent
		};
	},

	dehydrate: function() {
		return this.getState();
	},

	rehydrate: function(state) {
		this.id = state.id;
		this.content = state.content;
		this.title = state.title;
		this.new = state.new;
		this.htmlContent = PostFormatter(state.content);
		this.refreshEvent = state.refreshEvent;
	}
});

module.exports = PostComposerStore;
