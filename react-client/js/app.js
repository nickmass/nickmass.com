var Fluxible = require('fluxible');

var app = new Fluxible({
	appComponent: require('./components/Routes.jsx')
});

app.registerStore(require('./stores/PostStore'));
app.registerStore(require('./stores/PostComposerStore'));
app.registerStore(require('./stores/UserStore'));

module.exports = app;
