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
		var page = this.getParams().page || 1;

		if(page != this.state.currentPage)
			this.executeAction(PostActions.getPostPage, {pageSize: this.state.pageSize, page: page});

		var pager;
		if(this.state.currentPage == 1 && this.state.hasMore)
			pager = <div><button className="u-pull-right" onClick={this.nextPage}>Next</button></div>;
		else if(this.state.hasMore)
			pager = <div><button className="u-pull-left" onClick={this.prevPage}>Prev</button><button className="u-pull-right" onClick={this.nextPage}>Next</button></div>;
		else if(this.state.currentPage > 1)	
			pager = <div><button className="u-pull-left" onClick={this.prevPage}>Prev</button></div>;
		var user = this.state.currentUser;
		
		return (
			<div>
			<UserBar user={user}/>
			<Header />
			<div className="container">
				{this.state.posts.map(function(post){
					return <BlogPost key={post.id} post={post} user={user}/>;
				})}
				{pager}
			</div>
			</div>
			);
	},
	
	nextPage: function() {
		var newPage = this.state.currentPage + 1;
		this.transitionTo('page', {page: newPage});
	},

	prevPage: function() {
		var newPage = this.state.currentPage - 1;
		if(newPage == 1)
			this.transitionTo('/');
		else
			this.transitionTo('page', {page: newPage});
	},

	onChange: function() {
		var postState = this.getStore(PostStore).getState();
		var userState = this.getStore(UserStore).getState();
		this.setState(postState);
		this.setState(userState);
	},
});

module.exports = BlogApp;
