var PostActions = {
	getInitialPosts: function(actionContext, payload, done) {
		var user = actionContext.UserInterface.getCurrentUser();
		var posts = actionContext.PostInterface.getPosts(10, 0)
		
		.then(function(posts) {
			posts.pageSize = 10;
			posts.page = 1;
			actionContext.dispatch('RECIEVE_POST_PAGE', posts);
			user.then(function(user) {
				if(user == 'Not Found')
					user = false;
				actionContext.dispatch('RECIEVE_CURRENT_USER', user);
				done();
			}, function() {
				done();
			});
		});
	},

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

	createOrUpdatePost: function(actionContext, payload, done) {
		var id = payload.id;
		if(id) {
			actionContext.PostInterface.updatePost(id, payload).then(function() {
				payload.refreshEvent();
				done();
			});
		} else {
			actionContext.PostInterface.createPost(payload).then(function() {
				payload.refreshEvent();
				done();
			});
		}
	},
	
	editPost: function(actionContext, payload, done) {
		actionContext.PostInterface.getPost(payload.id).then(function(post) {
			post.refreshEvent = payload.refreshEvent;
			actionContext.dispatch('EDIT_POST', post);
			done();
		});
	},

	deletePost: function(actionContext, payload, done) {
		var post = payload;
		actionContext.PostInterface.deletePost(post.id).then(function() {
			done();
		});
	},

	composePost: function(actionContext, payload, done) {
		actionContext.dispatch('COMPOSE_POST', payload);
		done();
	}
};

module.exports = PostActions;