var marked = require('marked');


var PostFormatter = {
	formatContent: function(content) {
		return marked(content);
	},
	
	formatDate: function(date) {
		var d = new Date(Number(date) || 0);
		return d.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
	},
	
	formatURLFragment: function(title) {
		var replacements =  [
			{find: /'/g, replace: ''},
			{find: /[^a-z0-9]/g, replace: '-'},
			{find: /-+/g, replace: '-'},
			{find: /^-|-$/, replace: ''}
		];

		return replacements.reduce(function(prev, curr) {
			return prev.replace(curr.find, curr.replace);
		}, title.toLowerCase());
	},

	format: function(post) {
		post.content = PostFormatter.formatContent(post.content);
		post.date = PostFormatter.formatDate(post.date);

		return post;
	}
};
module.exports = PostFormatter;
