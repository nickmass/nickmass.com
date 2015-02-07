var marked = require('marked');


var PostFormatter = {
	formatContent: function(content) {
		return marked(content);
	},
	
	formatDate: function(date) {
		var d = new Date(Number(date) || 0);
		return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
	},

	format: function(post) {
		post.content = PostFormatter.formatContent(post.content);
		post.date = PostFormatter.formatDate(post.date);

		return post;
	}
};
module.exports = PostFormatter;
