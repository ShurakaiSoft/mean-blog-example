/*
 * Serve JSON to our AngularJS client
 */

// initialize our faux database
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

// GET

function posts(req, res) {
	var posts = [];
	data.posts.forEach(function (post, i) {
		posts.push({
			id: i,
			title: post.title,
			text: post.text.substr(0,50) + '...'
		});
	});
	res.json({ posts: posts });
}

function post(req, res) {
	var id = req.params.id;
	if (id >= 0 && id < data.posts.length) {
		res.json({ post: data.posts[id] });
	} else {
		res.json(false);
	}
}


// POST

function addPost(req, res) {
	data.posts.push(req.body);
	res.json(req.body);
}


// PUT

function editPost(req, res) {
	var id = req.params.id;

	if (id >= 0 && id < data.posts.length) {
		data.posts[id] = req.body;
		res.json(true);
	} else {
		res.json(false);
	}
}


// DELETE

function deletePost(req, res) {
	var id = req.params.id;

	if (id >= 0 && id < data.posts.length) {
		data.posts.splice(id, 1);
		res.json(true);
	} else {
		res.json(false);
	}
};

function addAll(server) {
	server.get('/api/posts', posts);
	server.get('/api/post/:id', post);
	server.post('/api/post', addPost);
	server.put('/api/post/:id', editPost);
	server.delete('/api/post/:id', deletePost);
}

module.exports = {
	addAll: addAll,
	addPost: addPost,
	deletePost: deletePost,
	editPost: editPost,
	post: post,
	posts: posts
};