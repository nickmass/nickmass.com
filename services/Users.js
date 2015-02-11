var Q = require('q');

module.exports = function(db, user) {

	users = {
		getSocialUser: function(socialId) {
			return Q(db).ninvoke('get', 'socialUser:' + socialId).then(function(userId) {
				if(!userId)
					throw 'User not found';
				return users.getUser(userId);
			});
		},

		getUser: function(id) {
			return users.getMultipleUsers([id]).then(function(users){
				return users[0];		
			}, function(err) {
				throw err;
			});
		},

		getMultipleUsers: function(ids) {
			var multi = db.multi();
			ids.forEach(function(id) {
				multi.hgetall('user:' + id);
			});

			return Q(multi).ninvoke('exec').then(function(users) {
				if(!users)
					throw 'User not found';
				
				return users;
			});
		},

		createSocialUser: function(socialId, user) {
			var dbUser;
			return users.createUser(user).then(function(localUser) {
				dbUser = localUser;
				return Q(db).ninvoke('set', 'socialUser:' + socialId, localUser.id);
			}).then(function() {
				return dbUser;
			});
		},

		createUser: function(user) {
			if (user.email == null || user.name == null)
				throw 'Missing required fields';
			return Q(db).ninvoke('incr', 'nextUserId').then(function(id) {
				user.id = id;
				return Q.all([Q(db).ninvoke('lpush', 'users', id),
							  Q(db).ninvoke('hmset', 'user:' + id, user)]);
			}).spread(function(usersCount){
				return user;
			});
		},

		getCurrentUser: function() {
			return Q(user).then(function(user) {
				if(!user)
					throw 'Not Found';
				return Q(user);
			});
		}
	};

	return users;
};
