var Q = require('q');
var Posts = require('./Posts');

module.exports = function(app, express, db) {

	this.getPosts = function(req, res) {
		Posts(db, req.user).getPosts(req.query.limit, req.query.skip).then(function(result) {
			res.send(result);
		}, errorHandler(res));
	};

	this.getPost = function(req, res) {
		Posts(db, req.user).getPost(req.params.id).then(function(post) {
			res.send(post);
		}, errorHandler(res));
	};

	this.createPost = function(req, res) {
		Posts(db, req.user).createPost(req.body).then(function(id) {
			res.location('/api/posts/' + id);
			res.status(201).end();
		}, errorHandler(res));
	};

	this.updatePost = function(req, res) {
		Posts(db, req.user).updatePost(req.params.id, req.body).then(function(id) {
			res.location('/api/posts/' + id);
			res.status(201).end();
		}, errorHandler(res));
	};
	
	this.deletePost = function(req, res) {
		Posts(db, req.user).deletePost(req.params.id).then(function() {
			res.status(200).end();
		}, errorHandler(res));
	};

	function errorHandler(res)
	{
		return function(err) {
			switch(err) {
				case Posts.Errors.NotFound:
					res.status(404).end();
					break;
				case Posts.Errors.Forbidden:
					res.status(403).end();
					break;
				default:
					console.log(err);
					res.status(500).end();
			}
		};
	}

	return this;
};
