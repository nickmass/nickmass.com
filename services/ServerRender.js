require('node-jsx').install({extension: '.jsx'});
var Q = require('q');
var React = require('react');
var App = require('../react-client/js/app');
var Html = require('../react-client/js/components/Html.jsx');
var Router = require('react-router');
var serialize = require('serialize-javascript');

var UserActions = require('../react-client/js/actions/UserActions');
var PostActions = require('../react-client/js/actions/PostActions');

ServerRender = function(db) {
	return function(req, res, next) {
		var context = App.createContext();
		var actionContext = context.getActionContext();
		actionContext.PostInterface = require('./Posts')(db, req.user);
		actionContext.UserInterface = {
			getCurrentUser: function() {
				return Q(req.user).then(function(user) {
					if(!user)
						throw 'Not Found';
					return Q(user);
				});
			}
		};
		Router.run(App.getAppComponent(), req.path, function (Handler, state) {
			context.executeAction(UserActions.getCurrentUser, state, function() {
			context.executeAction(PostActions.getPostPage, {page: 1, pageSize: 10}, function() {
				var exposed = 'window.App=' + serialize(App.dehydrate(context)) + ';';
				React.withContext(context.getComponentContext(), function() {
					var html = React.renderToStaticMarkup(Html({
						state: exposed,
						markup: React.renderToString(React.createFactory(Handler)())
					}));

					res.write(html);
					res.end();
				});
			});
			});
		});
	};
};

module.exports = ServerRender;
