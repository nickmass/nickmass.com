var Q = require('q');
var PageCache = function (db) {
	var cachePrefix = 'pageCache:';
	var expires = 20 * 60;
	return {

		getFromCache: function(path) {
			return Q(db).ninvoke('get', cachePrefix + path);
		},

		addToCache: function(path, content) {
			db.setex(cachePrefix + path, expires, content);
		},

		clearCache: function() {
			return Q(db).ninvoke('keys', cachePrefix + '*').then(function(keys) {
				return Q(db).ninvoke('del', keys);
			});
		}
	};
};

module.exports = PageCache;
