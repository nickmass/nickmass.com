var React = require('react');
var Router = require('react-router');
var FluxibleMixin = require('fluxible').Mixin;

var PostActions = require('../actions/PostActions');

var PostStore = require('../stores/PostStore');
var BlogPost = require('./BlogPost.jsx');

var SinglePost = React.createClass({
	mixins: [Router.State, Router.Navigation, FluxibleMixin],
	statics: {
		storeListeners: [PostStore],
		fetchData: function(executeAction, params, cb) {
			executeAction(PostActions.getPost, params.fragment, cb);
		}
	},

	getInitialState: function() {
		var post = this.getStore(PostStore).getState().post;
		var fragment = this.getParams().fragment;
		if(post.urlFragment != fragment)
			this.executeAction(PostActions.getPost, fragment);
		return post; 
	},
	
	render: function() {
		return (
				<div className="container">
					<BlogPost post={this.state} />
				</div>
			   );
	},
	
	onChange: function() {
		var post = this.getStore(PostStore).getState().post;
		var fragment = this.getParams().fragment;
		if(post.urlFragment != fragment)
			this.replaceWith('post', {fragment: post.urlFragment});

		this.setState(post);
	}
});

module.exports = SinglePost;
