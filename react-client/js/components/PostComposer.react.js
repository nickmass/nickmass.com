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
		return (
				<div>
					<label>Title</label>
					<input className="u-full-width" type="text" value={this.state.title} onChange={this._onChangeTitle}/>
					<label>Content</label>
					<textarea className="u-full-width" value={this.state.content} onChange={this._onChangeContent}/><br/>
					<input className="button-primary" type="button" value="Submit" onClick={this._onSubmitPost}/>
					<div dangerouslySetInnerHTML={{ __html: this.state.htmlContent}} />
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
	}

});

module.exports = PostComposer;
