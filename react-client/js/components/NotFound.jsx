var React = require('react');

var NotFound = React.createClass({
	render: function() {
		return (
				<div className="container" style={{textAlign: 'center'}}>
					<h2 style={{display: 'inline-block', margin: '50px auto 0 auto'}}>Not Found</h2>
				</div>
			   );
	}
});

module.exports = NotFound;
