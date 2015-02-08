var React = require('react');
var Router = require('react-router');
var BlogPost = require('./BlogPost.react');
var PostStore = require('../stores/PostStore');
var UserStore = require('../stores/UserStore');
var BlogViewActions = require('../actions/BlogViewActions');
var UserBar = require('./UserBar.react');
var Header = require('./Header.react');

var BlogWebAPIUtil = require('../utils/BlogWebAPIUtil');

function getBlogState() {
	return {
		allPosts: PostStore.getAll(),
		currentPage: PostStore.getCurrentPage(),
		pageSize: PostStore.getPageSize(),
		hasMore: PostStore.hasMore(),
		currentUser: UserStore.getCurrentUser()
	};
}

BlogWebAPIUtil.getAllPosts(1, 10);

var BlogApp = React.createClass({
	mixins: [Router.State, Router.Navigation],
	getInitialState: function() {
		var params = this.getParams();
		if(params.page)
			BlogWebAPIUtil.getAllPosts(params.page, 10);
		else {
			var page = PostStore.getCurrentPage();
			if(page == 1)
				this.replaceWith('/');
			else
				this.replaceWith('page', {page: page});
		}
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
			pager = <div><button className="u-pull-right" onClick={this._nextPage}>Next</button></div>;
		else if(this.state.hasMore)
			pager = <div><button className="u-pull-left" onClick={this._prevPage}>Prev</button><button className="u-pull-right" onClick={this._nextPage}>Next</button></div>;
		else	
			pager = <div><button className="u-pull-left" onClick={this._prevPage}>Prev</button></div>;

		var user = this.state.currentUser;
		return (
			<div>
			<UserBar user={user} />
			<Header />
			<div className="container">
				{this.state.allPosts.map(function(post){
					return <BlogPost key={post.id} post={post} user={user} />;
				})}
				{pager}
			</div>
			</div>
			);
	},
	
	_nextPage: function() {
		this.transitionTo('page', {page: this.state.currentPage + 1});
		BlogViewActions.nextPage();
	},

	_prevPage: function() {
		if(this.state.currentPage == 2)
			this.transitionTo('/');
		else
			this.transitionTo('page', {page: this.state.currentPage - 1});
		BlogViewActions.prevPage();
	},

	_onChange: function() {
		this.setState(getBlogState());
		if(this.state.currentPage == 1)
			this.replaceWith('/');
		else
			this.replaceWith('page', {page: this.state.currentPage});
	}
});

module.exports = BlogApp;
