const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const modgodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid Email Address'],
		required: 'Please supply an email address'
	},
	resetPasswordToken: String,
	resetPasswordExpires: String,
	role: {
		type: String,
		enum: ['user', 'admin']
	},
	profile: {
		name: {
			type: String,
			default: ''
		},
		gender: {
			type: String,
			enum: ['male', 'female'],
			default: 'female'
		},
		location: {
			type: String,
			default: ''
		}
	}
},
{
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

userSchema.virtual('gravatar')
	.get(function(){
		const hash = md5(this.email);
		return `https://s.gravatar.com/avatar/${hash}?s=60`;
	});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});
userSchema.plugin(modgodbErrorHandler);

module.exports = mongoose.model('User', userSchema)