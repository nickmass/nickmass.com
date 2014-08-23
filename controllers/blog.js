module.exports = function(app, express, db) {
	app.get('/blog', function (req, res) {
		db.info(function (err, reply) {
			res.send(reply);
		});
	});
};
