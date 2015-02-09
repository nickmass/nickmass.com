var PostStore = require('../stores/PostStore');

var PostActions = {
	getPostPage: function(actionContext, payload, done) {
		var skip = (payload.page - 1) * payload.pageSize;
		var limit = payload.pageSize;
		actionContext.PostInterface.getPosts(limit, skip).then(function(posts) {
			posts.pageSize = payload.pageSize;
			posts.page = payload.page;
			actionContext.dispatch('RECIEVE_POST_PAGE', posts);
			done();
		});
	},

	refreshPage: function(actionContext, payload, done) {
		var state = actionContext.getStore(PostStore).getState();
		actionContext.executeAction(PostActions.getPostPage, {page: state.currentPage, pageSize: state.pageSize}, done);
	},

	createOrUpdatePost: function(actionContext, payload, done) {
		var id = payload.id;
		if(id) {
			actionContext.PostInterface.updatePost(id, payload).then(function() {
				actionContext.executeAction(PostActions.composePost, {} , function () { //Clear post dialog
					actionContext.executeAction(PostActions.refreshPage, {}, done);
				});
			});
		} else {
			actionContext.PostInterface.createPost(payload).then(function() {
				actionContext.executeAction(PostActions.refreshPage, {}, done);
			});
		}
	},
	
	editPost: function(actionContext, payload, done) {
		actionContext.PostInterface.getPost(payload.id).then(function(post) {
			actionContext.dispatch('EDIT_POST', post);
			done();
		});
	},

	deletePost: function(actionContext, payload, done) {
		var post = payload;
		actionContext.PostInterface.deletePost(post.id).then(function() {
			actionContext.executeAction(PostActions.refreshPage, {}, done);
		});
	},

	composePost: function(actionContext, payload, done) {
		actionContext.dispatch('COMPOSE_POST', payload);
		done();
	}
};

module.exports = PostActions;
