var rest = require('rest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');

var client = rest.wrap(mime, {mime: 'application/json'});

var baseURL = '/api';

var errors = {
	NotFound: 'Not Found',
	Forbidden: 'Forbidden'
};

var interceptor = require('rest/interceptor');
var handleErrorsInterceptor = interceptor({
	response: function(response) {
		switch(response.status) {
			case 403:
				throw errors.Forbidden;
				break;
			case 404:
				throw errors.NotFound;
				break;
		}
		return response;
	}
});


client = client.wrap(handleErrorsInterceptor);

PostAPIInterface = {
	getPosts: function (limit, skip) {
		return client({
			path: baseURL + '/posts',
			params: {
				limit: limit,
				skip: skip
		}}).then(function(data) {
			return data.entity;
		});
	},

	getPost: function(id) {
		return client({
			path: baseURL + '/posts/' + id
		}).then(function(data) {
			return data.entity;
		});
	},

	getPostByFragment: function(fragment) {
		return client({
			path: baseURL + '/posts/' + fragment
		}).then(function(data) {
			return data.entity;
		});
	},

	createPost: function(post) {
		return client({
			path: baseURL + '/posts',
			method: 'POST',
			entity: post
		});
	},

	updatePost: function(id, post) {
		return client({
			path: baseURL + '/posts/' + id,
			method: 'PUT',
			entity: post
		});
	},
	
	deletePost: function(id) {
		return client({
			path: baseURL + '/posts/' + id,
			method: 'DELETE'
		});
	}	
};
PostAPIInterface.Errors = errors;
module.exports = PostAPIInterface;
