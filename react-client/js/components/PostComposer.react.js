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
					<input type="text" value={this.state.title} onChange={this._onChangeTitle}/><br/>
					<input type="text" value={this.state.author} onChange={this._onChangeAuthor}/><br/>
					<textarea value={this.state.content} onChange={this._onChangeContent}/><br/>
					<input type="button" onClick={this._onSubmitPost}/>
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
