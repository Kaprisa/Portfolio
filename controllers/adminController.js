const mongoose = require('mongoose');
const Skill = mongoose.model('Skill');
const Article = mongoose.model('Article');
const Work = mongoose.model('Work');
const User = mongoose.model('User');

exports.getHome = async (req, res) => {
	const page = req.params.page || 'about';
	let data = {};
	if (page === 'about') {
		data.skills = await Skill.find();
	} else if (page === 'blog') {
		data.categories = await Article.getCategories();
	} else if (page === 'works') {
		data.works = await Work.find().select('_id name');
	}
	if (req.query.axs) {
		res.render(`admin/partials/${page}`, { data }, function(err, html) {
			return res.send(html);
		});
	} else {
		res.render('admin/index', {name: 'admin', data , page});
	}
}

exports.getProfile = (req, res) => {
	res.render('admin/profile', {name: 'profile'});
}

exports.updateProfile = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user._id, { $set: { profile: req.body } });
	res.send('Профиль успешно обновлён!');
}