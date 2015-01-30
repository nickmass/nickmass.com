var BlogServerActions = require('../actions/BlogServerActions');
var rest = require('rest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');

var client = rest.wrap(mime, {mime: 'application/json'});

var baseURL = '/api';
module.exports = {
	getAllPosts: function (page, pageSize) {
		client({ path: baseURL + '/posts', params: {skip: (page-1) * pageSize, limit: pageSize}}).then(function(data){
			BlogServerActions.receiveAllPosts(page, pageSize, data.entity.items, data.entity.hasMore, data.entity.total);
		});
	},

	createPost: function(post) {
		client({ path: baseURL + '/posts', method: 'POST', entity: post}).then(function(data) {
			
		});
	}
};
