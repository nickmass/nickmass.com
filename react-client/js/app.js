var Fluxible = require('fluxible');
require('events').EventEmitter.prototype._maxListeners = 100;

var app = new Fluxible({
	appComponent: require('./components/Routes.jsx')
});

app.registerStore(require('./stores/PostStore'));
app.registerStore(require('./stores/PostComposerStore'));
app.registerStore(require('./stores/UserStore'));

module.exports = app;
