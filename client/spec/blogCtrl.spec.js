describe('Unit: BlogCtrl', function () {
	beforeEach(module('app'));

	var ctrl, scope, httpBackend, blogService;
	beforeEach(inject(function($controller, $rootScope, $httpBackend, _BlogService_) {
		httpBackend = $httpBackend;
		blogService = _BlogService_;
		scope = $rootScope.$new();
		ctrl = $controller('BlogCtrl', {
			$scope: scope,
			BlogService: _BlogService_
		});
	}));

	it('should have posts', function () {
		httpBackend.whenGET("http://localhost:3000/api/posts").respond([
				{title: 'Hello', content: 'World'}
		]);
		httpBackend.flush();
		expect(ctrl.posts.length).toBeGreaterThan(0);
	});

});
