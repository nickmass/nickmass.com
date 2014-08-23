describe('Unit: BlogCtrl', function () {
	beforeEach(module('app'));

	var ctrl, scope;
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();

		ctrl = $controller('BlogCtrl', {
			$scope: scope
		});
	}));

	it('should have 4 posts', function () {
		expect(ctrl.posts.length).toEqual(4);
	});

});
