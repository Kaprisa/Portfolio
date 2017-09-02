const mongoose = require('mongoose');
mongoose.Promise = global.Promie;

const worksSchema = new mongoose.Schema({
	name: {
  	type: String,
  	trim: true,
  	required: true
  },
	description: {
		type: String,
		trim: true
	},
	link: {
		type: String,
		trim: true
	},
	photo: String
});

module.exports = mongoose.model('Work', worksSchema);
