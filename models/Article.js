const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const articleSchema = new mongoose.Schema({
	category: {
		type: String,
		trim: true,
		default: 'Программирование'
	},
	title: {
		type: String,
		trim: true,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date
	},
	text: {
		type: String,
		trim: true,
		required: true
	},
	tags: [String]
});

articleSchema.statics.getCategories = function(){
	return this.aggregate(
		{ $group: {
			_id: '$category',
			//articles: {$push: '$title'},
			count: {$sum: 1}
		}}
	);
}

module.exports = mongoose.model('Article', articleSchema);
