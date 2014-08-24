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
	};

	this.createPost = function(req, res) {
		var newPost = {
			title: req.body.title,
			body: req.body.body,
			date: new Date(),
			author: 'NickMass'
		};
		
		Q(db).ninvoke('incr', 'nextPostId').then(function(data) {
			newPost.Id = data;
			
			return Q.all([Q(db).ninvoke('lpush', 'posts', newPost.Id),
						  Q(db).ninvoke('hmset', 'post:' + newPost.Id, newPost)]);
		}).then(function(data) {
			res.location('/app/posts/' + newPost.Id);
			res.status(201).end();
		});
	};

	this.updatePost = function(req, res) {
	};

	return this;
};
