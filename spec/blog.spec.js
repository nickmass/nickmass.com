var request = require('request');


describe('A test', function() {
	it('should have the word redis', function(done) {
		request('http://localhost:3000/blog', function (error, response, body) {
			expect(body).toContain('redis');
			done();
		});
	});
});
