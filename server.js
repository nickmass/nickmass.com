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

var services = {
	PostsAPI : require('./services/PostAPI')(app, express, db),
	Authentication: require('./services/Authentication')(db),
	ServerRender: require('./services/ServerRender')(db)
};

app.use(compression());
app.use(express.static('dist'));
app.use(session({secret: keys.SessionSecret, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
routes.setup(app, services)

app.listen(3000);
