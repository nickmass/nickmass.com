var express = require('express');
var app = module.exports = express();
var redis = require('redis');
var db = redis.createClient();

app.use(express.static('client'));

[
	'blog'
].forEach(function(controller) {
	require('./controllers/' + controller + '.js')(app, express, db);
});


app.listen(3000);
