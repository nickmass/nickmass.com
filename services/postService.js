var Q = require('q');

module.exports = function(app, express, db) {
	this.getPosts = function(req, res) {
		var postLimit = req.param.limit || 10;		

		Q.all([Q.ninvoke(db, 'info'),
				Q.ninvoke(db, 'get', 'someKey')])
			.then(function(data) {
				res.send(data);
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
		console.log('Called');
		
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
