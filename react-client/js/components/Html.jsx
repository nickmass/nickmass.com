var React = require('react');

var Html = React.createClass({
	render: function() {
		return (
<html>
	<head>
		<meta charSet="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<title>NickMass.com</title>
		<link href="/css/bundle.css" rel="stylesheet" type="text/css"/>
		<link href="//fonts.googleapis.com/css?family=Josefin+Sans:300,400,700,400italic|Source+Code+Pro" rel="stylesheet" type="text/css"/>
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	</head>
	<body dangerouslySetInnerHTML={{__html: this.props.markup}}>
	</body>
	<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
	<script src="/js/bundle.js"></script>
</html>
			   );
	}
});

module.exports = Html;
