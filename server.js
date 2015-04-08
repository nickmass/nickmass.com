var express = require('express');
var compression = require('compression');
var session = require('express-session');
var app = module.exports = express();
var bodyParser = require('body-parser');
var config = require('./config');
var routes = require('./routes');
var redis = require('redis');
var keys = require('./keys');
var db = redis.createClient();
var passport = require('passport');
var staticCache = require('express-static-cache');

var services = {
	PostAPI : require('./services/PostAPI')(db),
	UserAPI : require('./services/UserAPI')(),
	Authentication: require('./services/Authentication')(db, config),
	ServerRender: require('./services/ServerRender')(db)
};

app.use(compression());
if(config.noCache)
	app.use(staticCache('dist', {buffer: false, maxAge: 0}));
else
	app.use(staticCache('dist', {buffer: true, maxAge: 60*60*24*30}));
app.use(session({secret: keys.SessionSecret, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
routes.setup(app, services)

app.listen(3000);
