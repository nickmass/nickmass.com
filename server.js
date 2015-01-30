var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var config = require('./config');
var routes = require('./routes');
var redis = require('redis');
var db = redis.createClient();

var services = {
	posts : require('./services/postService')(app, express, db) 
};

app.use(bodyParser.json());
app.use(express.static('react-client'));
routes.setup(app, services)

app.listen(3000);
