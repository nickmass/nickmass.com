var React = require('react');
var BlogPost = require('./BlogPost.react');
var PostComposer = require('./PostComposer.react');
var PostStore = require('../stores/PostStore');
var PostComposerStore = require('../stores/PostComposerStore');
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
		composePost: PostComposerStore.getComposePost(),
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
		PostComposerStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PostStore.removeChangeListener(this._onChange);
		UserStore.removeChangeListener(this._onChange);
		PostComposerStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var pager;
		if(this.state.currentPage == 1 && this.state.hasMore)
			pager = <div><button className="u-pull-right" onClick={this._nextPage}>Next</button></div>;
		else if(this.state.hasMore)
			pager = <div><button className="u-pull-left" onClick={this._prevPage}>Prev</button><button className="u-pull-right" onClick={this._nextPage}>Next</button></div>;
		else	
			pager = <div><button className="u-pull-left" onClick={this._prevPage}>Prev</button></div>;

		var postComposer;
		if(this.state.composePost)
			postComposer = <PostComposer />;
		var user = this.state.currentUser;
		return (
			<div>
			<UserBar user={user} />
			<Header />
			<div className="container">
				{postComposer}
				{this.state.allPosts.map(function(post){
					return <BlogPost key={post.id} post={post} user={user} />;
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
