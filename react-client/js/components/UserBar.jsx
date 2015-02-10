var React = require('react');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var FluxibleMixin = require('fluxible').Mixin;
var PostActions = require('../actions/PostActions');

var UserStore = require('../stores/UserStore');

var UserBar = React.createClass({
	mixins: [Router.Navigation, FluxibleMixin],
	statics: {
		storeListeners: [UserStore]
	},

	getInitialState: function() {
		return this.getStore(UserStore).getState();
	},

	render: function() {
		var user = this.state.currentUser;
		if(user) {
			return (
				<div id="user-bar" className="u-full-width">
					<div className="u-pull-right">
						<span className="user-greeting">Hello, {user.name}</span>
						<button className="button-primary" onClick={this.onCreatePost}>Create Post</button>
						<button onClick={this.onLogout}>Logout</button>
					</div>
					<div className="u-cf" />
				</div>
				   );
		} else {
			return (
				<div id="user-bar" className="u-full-width">
					<div className="u-pull-right">
						<button className="button-primary" onClick={this.onLogin}>Login</button>
					</div>
					<div className="u-cf" />
				</div>
				   );
		}
	},

	onChange: function() {
		this.setState(this.getStore(UserStore).getState());
	},
	
	onCreatePost: function(event) {
		this.executeAction(PostActions.composePost);
		this.transitionTo('create-post');
	},

	onLogout: function(event) {
		window.location.replace('/auth/logout');
	},

	onLogin: function(event) {
		window.location.replace('/auth/google');
	}
});

module.exports = UserBar;
