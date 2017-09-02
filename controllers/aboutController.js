const mongoose = require('mongoose');
const Skill = mongoose.model('Skill');

exports.getAbout = async (req, res) => {
	const skills = await Skill.find();
	res.render('about', {name: 'about', skills});
}

exports.getSkills = async (req, res) => {
	const skillsSection = await Skill.findOne(req.query);
	res.send(skillsSection.skills);
}

exports.updateSkillsGlobal = async (req, res) => {
	const data = req.body;
	for ( category in data) {
		let skills = []
		for (skill in data[category]) {
			skills.push({
				name: skill,
				percent: data[category][skill]
			});
		}
		await Skill.update( { category: category }, { category: category, skills: skills});
	}
	res.send('Success');
}

exports.updateCategorySkills = async (req, res) => {
	const skillsSection = await Skill.findOneAndUpdate( { category: req.body.category }, req.body, { upsert: true, new: true, setDefaultsOnInsert: true });
	res.render('admin/components/skills-col', { skillsSection }, function(err, html) {
		res.send(html);
	})
}

exports.removeCategorySkills = async (req, res) => {
	await Skill.remove({category: req.params.category});
	res.send('Удаление прошло успешно');
}