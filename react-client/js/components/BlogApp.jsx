var React = require('react');
var Router = require('react-router');
var FluxibleMixin = require('fluxible').Mixin;
var UserBar = require('./UserBar.jsx');
var Header = require('./Header.jsx');
var BlogPost = require('./BlogPost.jsx');
var PostStore = require('../stores/PostStore');
var UserStore = require('../stores/UserStore');

var PostActions = require('../actions/PostActions');

var BlogApp = React.createClass({
	mixins: [Router.State, Router.Navigation, FluxibleMixin],
	getInitialState: function() {
		var state = this.getStore(PostStore).getState();
		var userState = this.getStore(UserStore).getState();
		state.currentUser = userState.currentUser;
		return state;
	},
	statics: {
		storeListeners: [PostStore, UserStore]
	},

	render: function() {
		var pager;
		if(this.state.currentPage == 1 && this.state.hasMore)
			pager = <div><button className="u-pull-right" onClick={this.nextPage}>Next</button></div>;
		else if(this.state.hasMore)
			pager = <div><button className="u-pull-left" onClick={this.prevPage}>Prev</button><button className="u-pull-right" onClick={this.nextPage}>Next</button></div>;
		else if(this.state.currentPage > 1)	
			pager = <div><button className="u-pull-left" onClick={this.prevPage}>Prev</button></div>;
		var user = this.state.currentUser;
		
		var refreshEvent = this.onRefresh;

		return (
			<div>
			<UserBar user={user} onRefresh={refreshEvent}/>
			<Header />
			<div className="container">
				{this.state.posts.map(function(post){
					return <BlogPost key={post.id} post={post} user={user} onRefresh={refreshEvent}/>;
				})}
				{pager}
			</div>
			</div>
			);
	},
	
	nextPage: function() {
		this.executeAction(PostActions.getPostPage, {pageSize: this.state.pageSize, page: this.state.currentPage + 1});
	},

	prevPage: function() {
		this.executeAction(PostActions.getPostPage, {pageSize: this.state.pageSize, page: this.state.currentPage - 1});
	},

	onChange: function() {
		var postState = this.getStore(PostStore).getState();
		var userState = this.getStore(UserStore).getState();
		this.setState(postState);
		this.setState(userState);
	},
	
	onRefresh: function() {
		this.executeAction(PostActions.getPostPage, {pageSize: this.state.pageSize, page: this.state.currentPage});
	}
});

module.exports = BlogApp;