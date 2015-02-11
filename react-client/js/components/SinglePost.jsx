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
		return this.getStore(PostStore).getState().post;
	},

	render: function() {
		var fragment = this.getParams().fragment;
		
		if(!this.state.id)
			this.executeAction(PostActions.getPost, fragment);

		return (
				<div className="container">
					<BlogPost key={this.state.id} post={this.state} />
				</div>
			   );
	},

	onChange: function() {
		this.setState(this.getStore(PostStore).getState().post);
	}
});

module.exports = SinglePost;
