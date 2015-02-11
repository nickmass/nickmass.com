require('node-jsx').install({extension: '.jsx'});
var Q = require('q');
var config = require('../config');
var React = require('react');
var App = require('../react-client/js/app');
var Html = require('../react-client/js/components/Html.jsx');
var Router = require('react-router');
var serialize = require('serialize-javascript');
var UserActions = require('../react-client/js/actions/UserActions');
var PostActions = require('../react-client/js/actions/PostActions');

ServerRender = function(db) {
	var PageCache = require('../services/PageCache')(db);
	return function(req, res) {
		PageCache.getFromCache(req.path).then(function(content) {
			if(!req.user && content && !config.noCache) {
				return Q(content);
			} else {
				return Q(false);
			}
		}).then(function(content) {
			if(content) {
				res.send(content);
				res.end();
			} else {
				var context = App.createContext();
				var actionContext = context.getActionContext();
				actionContext.PostInterface = require('./Posts')(db, req.user);
				actionContext.UserInterface = require('./Users')(db, req.user);
				Router.run(App.getAppComponent(), req.path, function (Handler, state) {
					var notFound = false;
					var dataLoads = state.routes
						.filter(function(r) {
						notFound = notFound || r.name == 'NotFound';
						return r.handler.fetchData;
					}).map(function(r) {
						return Q(r.handler).ninvoke('fetchData', context.executeAction.bind(context), state.params);
					});
					dataLoads.push(Q(context).ninvoke('executeAction', UserActions.getCurrentUser, {}));
					Q.all(dataLoads).then(function() {
						var exposed = 'window.App=' + serialize(App.dehydrate(context)) + ';';
						React.withContext(context.getComponentContext(), function() {
							var html = React.renderToStaticMarkup(Html({
								state: exposed,
								markup: React.renderToString(React.createFactory(Handler)())
							}));

							if(notFound)
								res.status(404);

							if(!req.user && !notFound)
								PageCache.addToCache(req.path, html);
							res.send(html);
							res.end();
						});
					});
				});
			}
		});
	};
};

module.exports = ServerRender;
