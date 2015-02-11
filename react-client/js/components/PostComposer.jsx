var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var PostFormatter = require('../utils/PostFormatter');
var PostComposerStore = require('../stores/PostComposerStore');
var PostStore = require('../stores/PostStore');

var PostActions = require('../actions/PostActions');

var Router = require('react-router');


var PostComposer = React.createClass({
	mixins: [Router.Navigation, Router.State, FluxibleMixin],
	getInitialState: function() {
		return this.getStore(PostComposerStore).getState();
	},

	statics: {
		storeListeners: [PostComposerStore],
		fetchData: function(executeAction, params, cb) {
			var postId = params.postId || null;
			if(postId == null)
				executeAction(PostActions.composePost, {}, cb);
			else
				executeAction(PostActions.editPost, {id: postId}, cb);
		}
	},

	render: function() {
		var postId = this.getParams().postId || null;
		
		if(postId != this.state.id) {
			if(postId == null)
				this.executeAction(PostActions.composePost);
			else
				this.executeAction(PostActions.editPost, {id: postId});
		}
		
		var title = this.state.new ? 'Create Post' : 'Edit Post';
		var preview;
		if(this.state.content.length > 0 && this.state.title.length > 0) {
			preview = (
					<div id="post-preview" className="post">
					<h6>{this.state.title}</h6>
					<small>Post Preview</small>
					<div dangerouslySetInnerHTML={{ __html: this.state.htmlContent}} />
					</div>
					);
		}
		return (
				<div id="post-composer">
					<h4>{title}</h4>
					<div id="post-entry">
					<label>Title</label>
					<input className="u-full-width" type="text" value={this.state.title} onChange={this.onChangeTitle}/>
					<label>Url Fragment</label>
					<input className="u-full-width" type="text" value={this.state.urlFragment} onChange={this.onChangeUrlFragment} />
					<label>Content</label>
					<textarea className="u-full-width" value={this.state.content} onChange={this.onChangeContent}/><br/>
					<button onClick={this.onCancel}>Cancel</button>
					<button className="button-primary" onClick={this.onSubmitPost}>Submit</button>
					</div>
					{preview}
				</div>
			   );
	},
	onChange: function() {
		var state = this.getStore(PostComposerStore).getState();
		this.setState(state);	
	},

	onChangeTitle: function(event) {
		this.setState({title: event.target.value, urlFragment: PostFormatter.formatURLFragment(event.target.value)});
	},
	
	onChangeUrlFragment: function(event) {
		this.setState({urlFragment: event.target.value});
	},

	onChangeContent: function(event) {
		this.setState({content: event.target.value, htmlContent: PostFormatter.formatContent(event.target.value)});
	},

	onSubmitPost: function() {
		this.executeAction(PostActions.createOrUpdatePost, this.state);
		var page = this.getStore(PostStore).currentPage;
		if(page <= 1)
			this.transitionTo('/');
		else
			this.transitionTo('page', {page: page});
	},

	onCancel: function() {
		var page = this.getStore(PostStore).currentPage;
		if(page <= 1)
			this.transitionTo('/');
		else
			this.transitionTo('page', {page: page});
	}
});

module.exports = PostComposer;
