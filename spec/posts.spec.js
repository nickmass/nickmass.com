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
	
	it('should return a list of posts', function(done) {
		request.get(baseUrl + '/api/posts', function(err, res, body) {
			expect(body.items.length).toBeDefined();
			expect(body.total).toBeDefined();
			expect(body.hasMore).toBeDefined();
			done();
		});
	});

	it('should limit post lists by limit param', function(done) {
		request.get(baseUrl + '/api/posts?limit=3', function(err, res, body) {
			expect(body.items.length).toEqual(3);
			done();
		});
	});

	it('should update posts', function(done) {
			request.post({url: baseUrl + '/api/posts', json: aPost}, function(err, res, body) {
			expect(res.statusCode).toEqual(201);
			var postLocation = res.headers.location;
			request.get(baseUrl + postLocation, function(err, res, body) {
				expect(body.title).toEqual(aPost.title);
				var updatedTitle = 'An updated title';
				var postId = body.id;
				body.title = updatedTitle;
				request.put({url: baseUrl + postLocation, json: body}, function(err, res, body) {
					expect(err).toBeNull();
					expect(res.statusCode).toEqual(200);
					request.get(baseUrl + postLocation, function(err, res, body) {
						expect(body.title).toEqual(updatedTitle);
						done();
					});
				});
			});
		});
	
	});
});
