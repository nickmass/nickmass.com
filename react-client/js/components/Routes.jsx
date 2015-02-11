var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Application = require('./Application.jsx');
var BlogApp = require('./BlogApp.jsx');
var PostComposer = require('./PostComposer.jsx');
var SinglePost = require('./SinglePost.jsx');
var NotFound = require('./NotFound.jsx');

var routes = (
		<Route name="app" path="/" handler={Application}>
			<Route name="create-post" path="create" handler={PostComposer} />
			<Route name="edit-post" path="edit/:postId" handler={PostComposer} />
			<Route name="page" path="page/:page" handler={BlogApp} />
			<Route name="post" path="post/:fragment" handler={SinglePost} />
			<DefaultRoute handler={BlogApp}/>
			<NotFoundRoute name="NotFound" handler={NotFound}/>
		</Route>
);

module.exports = routes;


