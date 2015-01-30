var Q = require('q');

module.exports = function(app, express, db) {
	this.getPosts = function(req, res) {
		var postLimit = (req.query.limit || 10) | 0;
		var postSkip = (req.query.skip || 0) | 0;
		
		if(postLimit > 50)
			postLimit = 50;

		Q(db).ninvoke('lrange', 'posts', postSkip, postLimit - 1 + postSkip).then(function(data) {
			if(!data)
				res.send([]);
			

			var multi = db.multi();

			data.forEach(function(postId) {
				multi.hgetall('post:' + postId);
			});
			
			return Q(multi).ninvoke('exec');
		}).then(function(posts) {
			return [posts, Q(db).ninvoke('llen', 'posts')];
		}).spread(function(posts, length) {
			res.send({
				items:posts,
				hasMore: length >= postLimit - 1 + postSkip,
				total: length
			});
		});
	};

	this.getPost = function(req, res) {
		var id = req.params.id;

		if(!id)
			res.status(404).end();

		Q(db).ninvoke('hgetall', 'post:' + id).then(function(data) {
			if(!data)
				res.status(404).end();

			res.send(data);
		}, errorHandler(res));
	};

	this.createPost = function(req, res) {
		var newPost = {
			title: req.body.title,
			content: req.body.content,
			date: new Date().getTime(),
			author: 'NickMass'
		};
		
		Q(db).ninvoke('incr', 'nextPostId').then(function(data) {
			newPost.id = data;
			
			return Q.all([Q(db).ninvoke('lpush', 'posts', newPost.id),
						  Q(db).ninvoke('hmset', 'post:' + newPost.id, newPost)]);
		}).then(function(data) {
			res.location('/api/posts/' + newPost.id);
			res.status(201).end();
		});
	};

	this.updatePost = function(req, res) {
		var id = req.params.id;

		if(!id)
			res.status(404).end();
		
		var updatedPost = {};

		if(req.body.title)
			updatedPost.title = req.body.title;

		if(req.body.content)
			updatedPost.content = req.body.content;
		Q(db).ninvoke('hexists', 'post:' + id, 'id').then(function(data) {
			if(data) {
				Q(db).ninvoke('hmset', 'post:' + id, updatedPost).then(function(data) {
					res.status(200).end();
				}, function(err) {
					console.log(err);
					res.status(500).end();
				});
			} else {
				createPost(req, res);
			}
		}, errorHandler(res));
	};

	function errorHandler(res)
	{
		return function(err) {
			console.log(err);
			res.status(500).end();
		};
	}

	return this;
};
