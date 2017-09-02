const mongoose = require('mongoose');
const Article = mongoose.model('Article');

exports.getBlog = async (req, res) => {
	const articles = await Article.find();
	res.render('blog', {name: 'blog', articles});
}

exports.getArticleById = async (req, res) => {
	const article = await Article.findById(req.params.id);
	res.render('article', {name: 'article', article});
}

exports.addArticle = async (req, res) => {
	await ( new Article(req.body).save() );
	res.send('Статья успешно добавлена!');
}

exports.updateArticle = async (req, res) => {
	req.body.updated = new Date();
	await Article.findOneAndUpdate( { _id: req.params.id }, req.body, { upsert: true, new: true, setDefaultsOnInsert: true });
	res.send('Статья успешно обновлена!');
}

exports.deleteArticle = async (req, res) => {
	await Article.remove({ _id: req.params.id });
	res.send('Удаление прошло успешно');
}

exports.editArticle = async (req, res) => {
	const article = await Article.findById(req.params.id);
	res.render('admin/components/blogForm', { article }, (err, html) => {
		res.send(html);
	})
}


exports.getArticlesByCategory = async (req, res) => {
	const articles = await Article.find({category: req.query.category});
	res.render('admin/components/categoryArticles', { articles }, (err, html) => {
		res.send(html);
	})
}

exports.deleteArticlesByCategory = async (req, res) => {
	await Article.remove({category: req.params.category});
	res.send('Категория успешно удалена');
}

