var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

var BlogApp = require('./components/BlogApp.react');
var PostComposer = require('./components/PostComposer.react');
var BlogWebAPIUtil = require('./utils/BlogWebAPIUtil');

BlogWebAPIUtil.getCurrentUser();

var App = React.createClass({
	render: function() {
		return (
				<div>
					<RouteHandler/>
				</div>
			   );
	}
});

var routes = (
		<Route name="app" path="/" handler={App}>
			<Route name="create-post" path="create" handler={PostComposer} />
			<Route name="edit-post" path="edit/:postId" handler={PostComposer} />
			<Route name="page" path="page/:page" handler={BlogApp} />
			<DefaultRoute handler={BlogApp}/>
		</Route>
		);

Router.run(routes, Router.HistoryLocation, function(Handler) {
	React.render(<Handler/>, document.body);
});
