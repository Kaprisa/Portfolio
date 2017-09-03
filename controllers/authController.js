const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.validateRegister = (req, res, next) => {
	req.checkBody('email', 'Указанный E-Mail не валиден').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extention: false,
		gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Пароль не может быть пустым').notEmpty;
	req.checkBody('password', 'Пароль не может быть пустым').notEmpty;
	req.checkBody('confirmPassword', 'Подтвердите пароль').notEmpty;
	req.checkBody('confirmPassword', 'Пароли не совпадают').equals(req.body.password);
	const errors = req.validationErrors();
	if (errors) {
		res.json({ errors: errors.map(err => err.msg) });
		return;
	}
	next();
}

exports.register = async (req, res, next) => {
	const user = new User({ email: req.body.email});
	const register = promisify(User.register, User);
	await register(user, req.body.password);
	next();
}

exports.isAdmin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next()
	} else {
		console.log('Вы должны иметь соответствующие права, чтобы продолжить');
		res.redirect('/');
	}
}


exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Failed login!',
	successRedirect: '/admin',
	successFlash: 'You are now logged in'
});

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
}

exports.forgot = async (req, res) => {
	const user = await User.findOne({email: req.body.email});
	if (!user) {
		return res.redirect('/login');
	}

	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 3600000;
	await user.save();
	const resetURL = `https://${req.headers.host}.account/reset/${user.resetPasswordToken}`;
	await mail.send({
		user,
		subject: 'Password reset',
		resetURL,
		filename: 'password-reset'
	});
	res.redirect('/login');
}

exports.reset = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if (!user) {
		return res.redirect('/login');
	}
	res.render('reset', {title: 'Reset your password'});
}

exports.confirmedPassword = (req, res, next) => {
	if (req.body.password === req.body['confirm-password']) {
		next();
		return;
	} 
	req.flash('error', 'Password do not match!');
	res.redirect('back');
}

exports.update = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if (!user) {
		return res.redirect('/login');
	}

	const setPassword = promisify(user.setPassword, user);
	await setPassword;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	const updatedUser = await user.save();
	await req.login(updatedUser);
	res.redirect('/');
}