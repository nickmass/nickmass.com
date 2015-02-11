function setup(app, services) {
	app.get('/api/posts', services.PostAPI.getPosts);
	app.get('/api/posts/:id([0-9]+)', services.PostAPI.getPost);
	app.get('/api/posts/:fragment', services.PostAPI.getPostByFragment);
	app.post('/api/posts', services.PostAPI.createPost);
	app.put('/api/posts/:id', services.PostAPI.updatePost);
	app.delete('/api/posts/:id', services.PostAPI.deletePost);	
	app.get('/api/users/current', services.UserAPI.getCurrentUser);
	
	app.get('/auth/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.get('/auth/google', services.Authentication.authenticate('oauth2'));
	app.get('/auth/google/return',
		services.Authentication.authenticate('oauth2', { failureRedirect: '/fail'}), function(req, res){
			res.redirect('/');
		});

	app.use(services.ServerRender);
}

exports.setup = setup;
