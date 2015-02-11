var React = require('react');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var FluxibleMixin = require('fluxible').Mixin;
var Link = Router.Link;

var PostActions = require('../actions/PostActions');

var UserStore = require('../stores/UserStore');

var BlogPost = React.createClass({
	mixins: [Router.Navigation, FluxibleMixin],
	statics: {
		storeListeners: [UserStore]
	},
	getInitialState: function() {
		return this.getStore(UserStore).getState();
	},
	propTypes: {
		post: ReactPropTypes.object.isRequired
	},

	render: function() {
		var post = this.props.post;

		var postEditor;

		if(this.state.currentUser) {
			postEditor = (
					<div className="u-pull-right">
					<button style={{marginRight: '16px'}} onClick={this.onEdit}>Edit</button><button onClick={this.onDelete}>Delete</button>
					</div>
					);
		}
		var title;

		if(post.urlFragment)
			title = <h6 itemProp="name"><Link to="post" params={{fragment: post.urlFragment}}>{post.title}</Link></h6>
		else
			title = <h6 itemProp="name">{post.title}</h6>

		return (
			<article className="post" itemScope itemType="http://schema.org/BlogPosting">
				{postEditor}
				{title}
				<small><span itemProp="author">{post.author}</span> on <span itemProp="datePublished">{post.date}</span></small>
				<div dangerouslySetInnerHTML={{__html: post.content}} itemProp="articleBody"/>
				<hr/>
			</article>
		);
	},

	onChange: function() {
		this.setState(this.getStore(UserPost).getState());
	},

	onEdit: function() {
		this.transitionTo('edit-post', {postId : this.props.post.id});
	},

	onDelete: function() {
		if(window.confirm('Are you sure you want to delete this post?')) {
			this.executeAction(PostActions.deletePost, this.props.post);
		}
	}
});

module.exports = BlogPost;


