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
						<a className="button" href="/auth/logout">Logout</a>
					</div>
					<div className="u-cf" />
				</div>
				   );
		} else {
			//Hide signup bar
			return (<span></span>);
			return (
				<div id="user-bar" className="u-full-width">
					<div className="u-pull-right">
						<a className="button button-primary" href="/auth/google">Login</a>
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
