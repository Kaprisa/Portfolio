const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const generateHtml = (filename, options = {}) => {
	const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
	const inlined = juice(html);
	return inlined;
}

const sendMail = async (options) => {
	const html = generateHtml(options.filename, options);
	const text = htmlToText.fromString(html);
	const mailOptions = {
		from: `${options.name} ${options.email}`,
		to: process.env.EMAIL,
		subject: options.subject,
		html,
		text
	};

	const sendMail = promisify(transport.sendMail, transport);
	return sendMail(mailOptions);
}

exports.sendContactMessage = async (req, res) => {
	const {email, name, message} = req.body;
	await sendMail({
		email,
		name,
		message,
		subject: 'Contact with me',
		filename: 'message'
	});
	res.send('Сообщение успешно отправлено!');
}