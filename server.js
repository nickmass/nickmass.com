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
	posts : require('./services/postService')(app, express, db),
	auth: require('./services/authenticationService')(db)
};

app.use(bodyParser.json());
app.use(compression());
app.use(express.static('dist'));
app.use(session({secret: keys.SessionSecret, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
routes.setup(app, services)

app.listen(3000);
