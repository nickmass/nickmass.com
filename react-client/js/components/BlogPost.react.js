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
				<h4>{post.title}</h4>
				<small>{post.author} on {post.date}</small>
				<p>{post.content}</p>
				<hr/>
			</article>
		);
	}
});

module.exports = BlogPost;


