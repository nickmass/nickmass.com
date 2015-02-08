var React = require('react');
var BlogViewActions = require('../actions/BlogViewActions');
var PostFormatter = require('../utils/PostFormatter');
var PostComposerStore = require('../stores/PostComposerStore');

var Router = require('react-router');

function getComposerState() {
	var post = PostComposerStore.getPost();
	return {
			id: post.id,
			title: post.title,
			content: post.content,
			htmlContent: PostFormatter.formatContent(post.content),
			new: post.new
	};
}

var PostComposer = React.createClass({
	mixins: [Router.Navigation, Router.State],

	getInitialState: function() {
		var params = this.getParams();
		if(params.postId)
			BlogViewActions.editPost({id: params.postId});

		return getComposerState();
	},
	
	componentDidMount: function() {
		PostComposerStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PostComposerStore.removeChangeListener(this._onChange);
	},
	
	render: function() {
		var title = this.state.new ? 'Create Post' : 'Edit Post';
		var preview;
		if(this.state.content.length > 0) {
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
					<input className="u-full-width" type="text" value={this.state.title} onChange={this._onChangeTitle}/>
					<label>Content</label>
					<textarea className="u-full-width" value={this.state.content} onChange={this._onChangeContent}/><br/>
					<button onClick={this._onCancel}>Cancel</button>
					<button className="button-primary" onClick={this._onSubmitPost}>Submit</button>
					</div>
					{preview}
				</div>
			   );
	},
	_onChange: function() {
		this.setState(getComposerState());	
	},

	_onChangeTitle: function(event) {
		this.setState({title: event.target.value});
	},

	_onChangeContent: function(event) {
		this.setState({content: event.target.value, htmlContent: PostFormatter.formatContent(event.target.value)});
	},

	_onSubmitPost: function() {
		BlogViewActions.createPost(this.state);
		this.transitionTo('/');
	},

	_onCancel: function() {
		this.transitionTo('/');
	}
});

module.exports = PostComposer;
