function setup(app, services) {
	app.get('/api/posts', services.PostsAPI.getPosts);
	app.get('/api/posts/:id', services.PostsAPI.getPost);
	app.post('/api/posts', services.PostsAPI.createPost);
	app.put('/api/posts/:id', services.PostsAPI.updatePost);
	app.delete('/api/posts/:id', services.PostsAPI.deletePost);	
	app.get('/auth/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.get('/auth/current', function (req, res) {
		if(!req.user) {
			res.status(404).end();
		}
		res.send(req.user);
	});
	app.get('/auth/google', services.Authentication.authenticate('oauth2'));
	app.get('/auth/google/return',
		services.Authentication.authenticate('oauth2', { failureRedirect: '/fail'}), function(req, res){
			res.redirect('/');
		});

	app.use(services.ServerRender);
}

exports.setup = setup;
