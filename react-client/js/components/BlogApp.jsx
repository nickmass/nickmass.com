var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var FluxibleMixin = require('fluxible').Mixin;
var UserBar = require('./UserBar.jsx');
var Header = require('./Header.jsx');
var BlogPost = require('./BlogPost.jsx');
var PostStore = require('../stores/PostStore');

var PostActions = require('../actions/PostActions');

var BlogApp = React.createClass({
	mixins: [FluxibleMixin, Router.State],
	getInitialState: function() {
		return this.getStore(PostStore).getState();
	},
	statics: {
		storeListeners: [PostStore],
		fetchData: function(executeAction, params, cb) {
			var page = Number(params.page) || 1;
			executeAction(PostActions.getPostPage, {page: page}, cb);
		},
	},
	render: function() {
		var page = Number(this.getParams().page) || 1;

		if(page != this.state.currentPage)
			this.executeAction(PostActions.getPostPage, {pageSize: this.state.pageSize, page: page});

		var pager;

		var nextButton;
		if(this.state.hasMore)
			nextButton = <Link className="button u-pull-right" to="page" params={{page: this.state.currentPage + 1}}>Next</Link>;
		var prevButton;
		if(this.state.currentPage > 2)
			prevButton = <Link className="button u-pull-left" to="page" params={{page: this.state.currentPage - 1}}>Prev</Link>;
		if(this.state.currentPage == 2)
			prevButton = <Link className="button u-pull-left" to="/">Prev</Link>;

		return (
			<div className="container">
				{this.state.posts.map(function(post){
					return <BlogPost key={post.id} post={post}/>;
				})}
				<div>{prevButton}{nextButton}</div>
			</div>
			);
	},
	
	onChange: function() {
		this.setState(this.getStore(PostStore).getState());
	}
});

module.exports = BlogApp;
