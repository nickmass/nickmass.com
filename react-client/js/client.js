var React = require('react');

var app = require('./app');
var Router = require('react-router');

var dehydratedState = window.App;

var PostAPIInterface = require('./utils/PostAPIInterface');
var UserAPIInterface = require('./utils/UserAPIInterface');

app.rehydrate(dehydratedState, function (err, context) {
	if(err)
		throw err;

	window.context = context;
	
	var actionContext = context.getActionContext();
	actionContext.PostInterface = PostAPIInterface;
	actionContext.UserInterface = UserAPIInterface;
	Router.run(app.getAppComponent(), Router.HistoryLocation, function(Handler, state) {
		React.withContext(context.getComponentContext(), function() {
			React.render(React.createFactory(Handler)(), document.body);
		});
	});
});
