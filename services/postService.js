var Q = require('q');

module.exports = function(app, express, db) {
	this.getPosts = function(req, res) {
		Q.all([Q.ninvoke(db, 'info'),
				Q.ninvoke(db, 'get', 'someKey')])
			.then(function(data) {
				res.send(data);
			});
	};

	this.getPost = function() {
	};

	this.createPost = function() {
	};

	this.updatePost = function() {
	};

	return this;
};
