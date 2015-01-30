var React = require('react');

var BlogApp = require('./components/BlogApp.react');
var BlogWebAPIUtil = require('./utils/BlogWebAPIUtil');

BlogWebAPIUtil.getAllPosts(1, 10);

React.render(
	<BlogApp />,
	document.getElementById('blogapp')
	);
