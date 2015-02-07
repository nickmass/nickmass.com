var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
				<div id="header">
				<h1>NickMass.com</h1>
				<h4>Some short subtitle</h4>
				<div className="social-container">
				<ul className="social-links">
				<li>Twitter</li>
				<li>Github</li>
				<li>BitBucket</li>
				</ul>
				</div>
				</div>
			   );
	}
});

module.exports = Header;
