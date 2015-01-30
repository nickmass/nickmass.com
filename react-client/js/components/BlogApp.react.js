var React = require('react');
var BlogPost = require('./BlogPost.react');
var PostComposer = require('./PostComposer.react');
var PostStore = require('../stores/PostStore');
var BlogWebAPIUtil = require('../utils/BlogWebAPIUtil');
var BlogViewActions = require('../actions/BlogViewActions');

function getBlogState() {
	return {
		allPosts: PostStore.getAll(),
		currentPage: PostStore.getCurrentPage(),
		pageSize: PostStore.getPageSize(),
		hasMore: PostStore.hasMore()
	};
}

var BlogApp = React.createClass({
	getInitialState: function() {
		return getBlogState();
	},

	componentDidMount: function() {
		PostStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PostStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var pager;
		if(this.state.currentPage == 1 && this.state.hasMore)
			pager = <div><span onClick={this._nextPage}>Next</span></div>;
		else if(this.state.hasMore)
			pager = <div><span onClick={this._prevPage}>Prev</span><span onClick={this._nextPage}>Next</span></div>;
		else	
			pager = <div><span onClick={this._prevPage}>Prev</span></div>;
		return (
			<section id="main">
				<PostComposer />
				{this.state.allPosts.map(function(post){
					return <BlogPost key={post.id} post={post} />;
				})}
				{pager}
			</section>
			);
	},
	
	_nextPage: function() {
		BlogViewActions.nextPage();
	},

	_prevPage: function() {
		BlogViewActions.prevPage();
	},

	_onChange: function() {
		this.setState(getBlogState());
	}
});

module.exports = BlogApp;
