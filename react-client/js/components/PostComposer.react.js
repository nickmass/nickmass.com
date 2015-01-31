var React = require('react');
var BlogViewActions = require('../actions/BlogViewActions');

var PostComposer = React.createClass({
	getInitialState: function() {
		return {title: '',
				author: '',
				content: ''}
	},
		
	render: function() {
		return (
				<div>
					<label>Title</label>
					<input className="u-full-width" type="text" value={this.state.title} onChange={this._onChangeTitle}/>
					<label>Date</label>
					<input className="u-full-width" type="text" value={this.state.author} onChange={this._onChangeAuthor}/><br/>
					<label>Content</label>
					<textarea className="u-full-width" value={this.state.content} onChange={this._onChangeContent}/><br/>
					<input className="button-primary" type="button" value="Submit" onClick={this._onSubmitPost}/>
				</div>
			   );
	},

	_onChangeTitle: function(event) {
		this.setState({title: event.target.value});
	},

	_onChangeAuthor: function(event) {
		this.setState({author: event.target.value});
	},

	_onChangeContent: function(event) {
		this.setState({content: event.target.value});
	},

	_onSubmitPost: function() {
		BlogViewActions.createPost(this.state);
		this.setState({title: '', author: '', content: ''});
	}

});

module.exports = PostComposer;
