var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var UserBar = require('./UserBar.jsx');
var Header = require('./Header.jsx');

var Application = React.createClass({
	render: function() {
		return (
				<div>
					<UserBar />
					<Header />
					<RouteHandler/>
				</div>
			   );
	}
});

module.exports = Application;
