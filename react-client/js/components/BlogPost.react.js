var React = require('react');
var ReactPropTypes = React.PropTypes;
var BlogViewActions = require('../actions/BlogViewActions');

var Router = require('react-router');

var BlogPost = React.createClass({
	mixins: [Router.Navigation],

	propTypes: {
		post: ReactPropTypes.object.isRequired
	},

	render: function() {
		var post = this.props.post;

		var postEditor;

		if(this.props.user) {
			postEditor = (
					<div className="u-pull-right">
					<button style={{marginRight: '16px'}} onClick={this._onEdit}>Edit</button><button onClick={this._onDelete}>Delete</button>
					</div>
					);
		}

		return (
			<article className="post" itemScope itemType="http://schema.org/BlogPosting">
				{postEditor}
				<h6 itemProp="name">{post.title}</h6>
				<small><span itemProp="author">{post.author}</span> on <span itemProp="datePublished">{post.date}</span></small>
				<div dangerouslySetInnerHTML={{__html: post.content}} itemProp="articleBody"/>
				<hr/>
			</article>
		);
	},

	_onEdit: function() {
		this.transitionTo('edit-post', {postId: this.props.post.id});
	},

	_onDelete: function() {
		if(window.confirm('Are you sure you want to delete this post?')) {
			BlogViewActions.deletePost(this.props.post);
		}
	}
});

module.exports = BlogPost;


