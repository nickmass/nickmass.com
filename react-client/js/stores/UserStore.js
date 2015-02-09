var createStore = require('fluxible/utils/createStore');

var UserStore = createStore({
	storeName: 'UserStore',
	initialize: function(dispatcher) {
		this.currentUser = false;
	},

	handleUserChange: function(payload) {
		this.currentUser = payload;
		this.emitChange();
	},
	
	handlers: {
		RECIEVE_CURRENT_USER: 'handleUserChange'
	},

	getState: function() {
		return {
			currentUser: this.currentUser
		};
	},
	
	dehydrate: function() {
		return this.getState();
	},

	rehydrate: function(state) {
		this.currentUser = state.currentUser;
	}
});

module.exports = UserStore;
