var BlogServerActions = require('../actions/BlogServerActions');
var rest = require('rest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');

var client = rest.wrap(mime, {mime: 'application/json'});

var baseURL = '/api';
module.exports = {
	getAllPosts: function (page, pageSize) {
		getAllPosts(page, pageSize);
	},

	createPost: function(post, updateParams) {
		client({ path: baseURL + '/posts', method: 'POST', entity: post}).then(function(data) {
			getAllPosts(updateParams.currentPage, updateParams.pageSize);
		});
	},
	
	deletePost: function(post, updateParams) {
		client({ path: baseURL + '/posts/' + post.id, method: 'DELETE'}).then(function(data) {
			getAllPosts(updateParams.currentPage, updateParams.pageSize);
		});
	},
	
	getCurrentUser: function() {
		client({ path: '/auth/current'}).then(function(data) {
			var currentUser = false;
			if(data.entity)
				currentUser = data.entity;
			BlogServerActions.receiveCurrentUser(currentUser);
		});
	}
};

function getAllPosts(page, pageSize) {
	client({ path: baseURL + '/posts', params: {skip: (page-1) * pageSize, limit: pageSize}}).then(function(data){
		BlogServerActions.receiveAllPosts(page, pageSize, data.entity.items, data.entity.hasMore, data.entity.total);
	});
}
