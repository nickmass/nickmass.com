var rest = require('rest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');

var client = rest.wrap(mime, {mime: 'application/json'});

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

UserAPIInterface = {
	getCurrentUser: function () {
		return client({
			path: '/auth/current',
		}).then(function(data) {
			return data.entity;
		});
	}
};
UserAPIInterface.Errors = errors;
module.exports = UserAPIInterface;
