var React = require('react');
var BlogPost = require('./BlogPost.react');
var PostComposer = require('./PostComposer.react');
var PostStore = require('../stores/PostStore');
var UserStore = require('../stores/UserStore');
var BlogViewActions = require('../actions/BlogViewActions');
var UserBar = require('./UserBar.react');
var Header = require('./Header.react');

function getBlogState() {
	return {
		allPosts: PostStore.getAll(),
		currentPage: PostStore.getCurrentPage(),
		pageSize: PostStore.getPageSize(),
		hasMore: PostStore.hasMore(),
		composePost: PostStore.getComposePost(),
		currentUser: UserStore.getCurrentUser()
	};
}

var BlogApp = React.createClass({
	getInitialState: function() {
		return getBlogState();
	},

	componentDidMount: function() {
		PostStore.addChangeListener(this._onChange);
		UserStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PostStore.removeChangeListener(this._onChange);
		UserStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var pager;
		if(this.state.currentPage == 1 && this.state.hasMore)
			pager = <div><span onClick={this._nextPage}>Next</span></div>;
		else if(this.state.hasMore)
			pager = <div><span onClick={this._prevPage}>Prev</span><span onClick={this._nextPage}>Next</span></div>;
		else	
			pager = <div><span onClick={this._prevPage}>Prev</span></div>;

		var postComposer;
		if(this.state.composePost)
			postComposer = <PostComposer />;

		return (

			<div>
			<UserBar user={this.state.currentUser} />
			<Header />
			<div className="container">
				{postComposer}
				{this.state.allPosts.map(function(post){
					return <BlogPost key={post.id} post={post} />;
				})}
				{pager}
			</div>
			</div>
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
