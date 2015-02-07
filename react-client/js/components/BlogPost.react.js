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
			<article className="post" itemscope itemtype="http://schema.org/BlogPosting">
				<h6 itemprop="name">{post.title}</h6>
				<small><span itemprop="author">{post.author}</span> on <span itemprop="publishedDate">{post.date}</span></small>
				<div dangerouslySetInnerHTML={{__html: post.content}} itemprop="articleBody"/>
				<hr/>
			</article>
		);
	}
});

module.exports = BlogPost;


