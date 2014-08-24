var request = require('request');

var aPost = {
	title: 'Hello World',
	body: 'This is a very simple test post'
};

describe('Service: Posts', function() {
	it('should be able to create posts', function(done) {
		request.post('http://localhost:3000/api/posts', aPost, function (err, res, body) {
			expect(res.statusCode).toEqual(201);

			done();
		});
	});
});
