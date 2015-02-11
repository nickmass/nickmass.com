var UserAPI = function() {
	return {
		getCurrentUser: function (req, res) {
			if(!req.user)
				res.status(404).end();
			else
				res.send(req.user);
		}
	};
}

module.exports = UserAPI;
