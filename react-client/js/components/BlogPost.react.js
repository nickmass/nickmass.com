var React = require('react');
var ReactPropTypes = React.PropTypes;
var PostStore = require('../stores/PostStore');

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
				<div dangerouslySetInnerHTML={{__html: post.content}}/>
				<hr/>
			</article>
		);
	}
});

module.exports = BlogPost;


