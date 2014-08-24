var request = require('request').defaults({json: true});

var baseUrl = 'http://localhost:3000';

var aPost = {
	title: 'Hello World',
	content: 'This is a very simple test post'
};

describe('Service: Posts', function() {
	it('should be able to create posts', function(done) {
		request.post({url: baseUrl + '/api/posts', json: aPost}, function (err, res, body) {
			expect(res.statusCode).toEqual(201);
			request.get(baseUrl + res.headers.location, function (err, res, body) {
				expect(body.title).toEqual(aPost.title);
				done();
			});
		});
	});

	it('should return 404 for nonexistant posts', function(done) {
		request.get(baseUrl + '/api/posts/1234567891011', function(err, res, body) {
			expect(res.statusCode).toEqual(404);
			done();
		});
	});

	it('should return 404 for bad post ids', function(done) {
		request.get(baseUrl + '/api/posts/badPostId', function(err, res, body) {
			expect(res.statusCode).toEqual(404);
			done();
		});
	});
});
