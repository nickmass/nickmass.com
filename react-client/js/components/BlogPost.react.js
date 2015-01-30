var React = require('react');
var ReactPropTypes = React.PropTypes;

var BlogPost = React.createClass({

	propTypes: {
		post: ReactPropTypes.object.isRequired
	},

	render: function() {
		var post = this.props.post;

		return (
			<article>
				<h2>{post.title}</h2>
				<small>{post.author} on {post.date}</small>
				<p>{post.content}</p>
			</article>
		);
	}
});

module.exports = BlogPost;


