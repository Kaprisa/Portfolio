const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const skillsSchema = new mongoose.Schema({
  category: {
		type: String,
    trim: true,
		required: true,
  	unique: true
  },
  skills: [{
    name: {
  		type: String,
      trim: true,
  		required: true,
  		unique: true
  	},
    percent: {
    	type: Number,
    	required: true
    }
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Skill', skillsSchema);
