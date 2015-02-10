var React = require('react');
var Router = require('react-router');
var FluxibleMixin = require('fluxible').Mixin;
var UserBar = require('./UserBar.jsx');
var Header = require('./Header.jsx');
var BlogPost = require('./BlogPost.jsx');
var PostStore = require('../stores/PostStore');

var PostActions = require('../actions/PostActions');

var BlogApp = React.createClass({
	mixins: [Router.State, Router.Navigation, FluxibleMixin],
	getInitialState: function() {
		return this.getStore(PostStore).getState();
	},
	statics: {
		storeListeners: [PostStore],
		fetchData: function(executeAction, params, cb) {
			var page = Number(params.page) || 1;
			executeAction(PostActions.getPostPage, {page: page}, cb);
		}
	},
	render: function() {
		var page = Number(this.getParams().page) || 1;

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
			<UserBar />
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
		this.setState(this.getStore(PostStore).getState());
	}
});

module.exports = BlogApp;
