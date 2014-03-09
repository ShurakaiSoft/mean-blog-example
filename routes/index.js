/*
 * GET home page.
 */

function index(req, res){
	res.render('index');
};

function partials(req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};

function addAll(server) {
	server.get('/', index);
	server.get('/partials/:name', partials);
}

module.exports = {
	addAll: addAll,
	index: index,
	partials: partials
};