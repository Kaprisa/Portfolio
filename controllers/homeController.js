exports.getHome = (req, res) => {
	res.render('welcome', {name: 'welcome'});
}