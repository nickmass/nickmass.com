var Q = require('q');

module.exports = function(app, express, db) {
	this.getPosts = function(req, res) {
		var postLimit = req.query.limit || 10;

		if(postLimit > 50)
			postLimit = 50;

		Q(db).ninvoke('lrange', 'posts', 0, postLimit - 1).then(function(data) {
			if(!data)
				res.send([]);
			
			var postFuncs = data.map(function(postId) {
				return Q(db).ninvoke('hgetall', 'post:' + postId);
			});
			
			Q.all(postFuncs).then(function(data) {
				res.send(data);
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
		}, function(err) {
			console.log(err);
			res.status(500).end();
		});
	};

	this.createPost = function(req, res) {
		var newPost = {
			title: req.body.title,
			content: req.body.content,
			date: new Date(),
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
		Q(db).ninvoke('hmset', 'post:' + id, updatedPost).then(function(data) {
			res.status(200).end();
		}, function(err) {
			console.log(err);
			res.status(500).end();
		});
	};

	return this;
};
