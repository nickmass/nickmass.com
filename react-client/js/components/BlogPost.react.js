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
			<article className="post" itemScope itemType="http://schema.org/BlogPosting">
				<h6 itemProp="name">{post.title}</h6>
				<small><span itemProp="author">{post.author}</span> on <span itemProp="datePublished">{post.date}</span></small>
				<div dangerouslySetInnerHTML={{__html: post.content}} itemProp="articleBody"/>
				<hr/>
			</article>
		);
	}
});

module.exports = BlogPost;


