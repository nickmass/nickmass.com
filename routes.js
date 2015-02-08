function setup(app, services) {
	app.get('/api/posts', services.posts.getPosts);
	app.get('/api/posts/:id', services.posts.getPost);
	app.post('/api/posts', services.posts.createPost);
	app.put('/api/posts/:id', services.posts.updatePost);
	app.delete('/api/posts/:id', services.posts.deletePost);	
	app.get('/auth/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.get('/auth/current', function (req, res) {
		res.send({name: 'Nick Massey', id: 2});
		return;
		if(!req.user) {
			res.status(404).end();
		}
		res.send(req.user);
	});
	app.get('/auth/google', services.auth.authenticate('oauth2'));
	app.get('/auth/google/return',
		services.auth.authenticate('oauth2', { failureRedirect: '/fail'}), function(req, res){
			res.redirect('/');
		});
}

exports.setup = setup;
