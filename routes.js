function setup(app, services) {
	app.get('/api/posts', services.posts.getPosts);
	app.get('/api/posts/:id', services.posts.getPost);
	app.post('/api/posts', services.posts.createPost);
	app.put('/api/posts/:id', services.posts.updatePost);
}

exports.setup = setup;
