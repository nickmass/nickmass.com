var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentUser = false;
var UserStore = assign({}, EventEmitter.prototype, {
	getCurrentUser: function() {
		return _currentUser;
	},
	
	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}
});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
		case 'RECEIVE_CURRENT_USER':
			_currentUser = action.currentUser;
			UserStore.emitChange();
			break;
		default:
	}
});

module.exports = UserStore;
