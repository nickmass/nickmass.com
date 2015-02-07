var React = require('react');
var BlogViewActions = require('../actions/BlogViewActions');
var PostFormatter = require('../utils/PostFormatter');

var PostComposer = React.createClass({
	getInitialState: function() {
		return {title: '',
				content: '',
				htmlContent: ''}
	},
		
	render: function() {
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
					<h4>Create Post</h4>
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

	_onChangeTitle: function(event) {
		this.setState({title: event.target.value});
	},

	_onChangeContent: function(event) {
		this.setState({content: event.target.value, htmlContent: PostFormatter.formatContent(event.target.value)});
	},

	_onSubmitPost: function() {
		BlogViewActions.createPost(this.state);
		this.setState({title: '', content: '', htmlContent: ''});
	},

	_onCancel: function() {
		BlogViewActions.hideComposePost();
	}
});

module.exports = PostComposer;
