var UserActions = {
	getCurrentUser: function(actionContext, payload, done) {
		actionContext.UserInterface.getCurrentUser().then(function(user) {
			if(user == 'Not Found')
				user = false;
			actionContext.dispatch('RECIEVE_CURRENT_USER', user);
			done();
		}, function() {
			done();
		});
	}
};

module.exports = UserActions;
