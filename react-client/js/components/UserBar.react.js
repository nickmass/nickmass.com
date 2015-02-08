var React = require('react');
var ReactPropTypes = React.PropTypes;
var BlogViewActions = require('../actions/BlogViewActions');

var UserBar = React.createClass({
	render: function() {
		if(this.props.user) {
			return (
				<div id="user-bar" className="u-full-width">
					<div className="u-pull-right">
						<span className="user-greeting">Hello, {this.props.user.name}</span>
						<button className="button-primary" onClick={this._onCreatePost}>Create Post</button>
						<button onClick={this._onLogout}>Logout</button>
					</div>
					<div className="u-cf" />
				</div>
				   );
		} else {
			return (
				<div id="user-bar" className="u-full-width">
					<div className="u-pull-right">
						<button className="button-primary" onClick={this._onLogin}>Login</button>
					</div>
					<div className="u-cf" />
				</div>
				   );
		}
	},

	_onLogout: function(event) {
		window.location.replace('/auth/logout');
	},

	_onLogin: function(event) {
		console.log('login');
		window.location.replace('/auth/google');
	},

	_onCreatePost: function(event) {
		BlogViewActions.composePost();
	}
});

module.exports = UserBar;