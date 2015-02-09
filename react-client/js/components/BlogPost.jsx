var React = require('react');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var FluxibleMixin = require('fluxible').Mixin;

var PostActions = require('../actions/PostActions');

var BlogPost = React.createClass({
	mixins: [Router.Navigation, FluxibleMixin],

	propTypes: {
		post: ReactPropTypes.object.isRequired
	},

	render: function() {
		var post = this.props.post;

		var postEditor;

		if(this.props.user) {
			postEditor = (
					<div className="u-pull-right">
					<button style={{marginRight: '16px'}} onClick={this.onEdit}>Edit</button><button onClick={this.onDelete}>Delete</button>
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

	onEdit: function() {
		var payload = {
			id: this.props.post.id,
			refreshEvent: this.props.onRefresh
		};
		this.executeAction(PostActions.editPost, payload);
		this.transitionTo('edit-post', {postId : this.props.post.id});
	},

	onDelete: function() {
		if(window.confirm('Are you sure you want to delete this post?')) {
			this.executeAction(PostActions.deletePost, this.props.post);
			this.props.onRefresh();
		}
	}
});

module.exports = BlogPost;


