var Q = require('q');
var errors = {
	NotFound: 'Not Found',
	Forbidden: 'Forbidden'
}


var Posts = function(db, user) {
	var Users = require('./Users')(db);
	var PageCache = require('./PageCache')(db);
	this.getPosts = function(limit, skip) {
		var postLimit = (limit || 10) | 0;
		var postSkip = (skip || 0) | 0;
		
		if(postLimit > 50)
			postLimit = 50;

		return Q(db).ninvoke('lrange', 'posts', postSkip, postLimit - 1 + postSkip).then(function(data) {
			if(!data)
				return Q([]);
			

			var multi = db.multi();

			data.forEach(function(postId) {
				multi.hgetall('post:' + postId);
			});
			
			return Q(multi).ninvoke('exec');
		}).then(function(posts) {
			var allAuthorIds = posts.map(function(post) {
					return post.authorId
			}).filter(function(id, index, self) {
					return self.indexOf(id) === index && Number(id);
			});

			return Q.all([Users.getMultipleUsers(allAuthorIds).then(function (allAuthors) {
				posts = posts.map(function(post) {
					var match = allAuthors.filter(function(author) {
						return author.id === post.authorId;
					});

					if(match[0]) {
						post.author = match[0].name;
						post.authorEmail = match[0].email;
					}
				
					return post;
				});
				return posts
			}), Q(db).ninvoke('llen', 'posts')]);
		}).spread(function(posts, length) {
			return {
				items:posts,
				hasMore: length > postLimit + postSkip,
				total: length
			};
		});
	};

	this.getPost = function(id) {
		if(!id)
			throw errors.NotFound;

		return Q(db).ninvoke('hgetall', 'post:' + id).then(function(data) {
			if(!data)
				throw errors.NotFound;
			
			return Q.all([Q(data), Users.getUser(data.authorId)]);
		}).spread(function(post, author) {
			post.author = author.name;
			post.authorEmail = author.email;

			return post;
		});
	};
	
	this.getPostByFragment = function(fragment) {
		return Q(db).ninvoke('get', 'postFragment:' + fragment).then(function(id) {
			if(!id)
				throw errors.NotFound;
			return getPost(id);
		});
	},
	
	this.createPost = function(post) {
		if(!user)
			throw errors.Forbidden;

		var newPost = {
			title: post.title,
			content: post.content,
			date: new Date().getTime(),
			authorId: user.id,
			urlFragment: post.urlFragment
		};
		
		return Q(db).ninvoke('incr', 'nextPostId').then(function(data) {
			newPost.id = data;
			return Q.all([Q(db).ninvoke('lpush', 'posts', newPost.id),
						  Q(db).ninvoke('hmset', 'post:' + newPost.id, newPost),
						  Q(db).ninvoke('set', 'postFragment:' + newPost.urlFragment, newPost.id)]);
		}).then(function(data) {
			PageCache.clearCache();	
			return newPost.id;
		});
	};

	this.updatePost = function(id, post) {
		if(!user)
			throw errors.Forbidden;

		var updatedPost = {};

		if(post.title)
			updatedPost.title = post.title;

		if(post.content)
			updatedPost.content = post.content;

		if(post.urlFragment)
			updatedPost.urlFragment = post.urlFragment;

		return Q(db).ninvoke('hexists', 'post:' + id, 'id').then(function(data) {
			if(data) {
				return Q.all([Q(db).ninvoke('hmset', 'post:' + id, updatedPost),
							  Q(db).ninvoke('set', 'postFragment:' + updatedPost.urlFragment, id)]).then(function(data) {
					PageCache.clearCache();	
					return id;
				});
			} else {
				return createPost(post);
			}
		});
	};
	
	this.deletePost = function(id) {
		if(!user)
			throw errors.Forbidden;

		if(!id)
			throw errors.NotFound;

		return Q(db).ninvoke('hgetall', 'post:' + id).then(function(data) {
			if(!data)
				throw errors.NotFound;

			return Q(db).ninvoke('lrem', 'posts', -1, id);
		}).then(function() {
			PageCache.clearCache();	
			return;
		});
	};
	
	return this;
};

Posts.Errors = errors;
module.exports = Posts;
