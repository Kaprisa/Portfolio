const mongoose = require('mongoose');
const Work = mongoose.model('Work');
const multer = require('multer'); 
const jimp = require('jimp'); 
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if (isPhoto) {
			next(null, true)
		} else {
			next({message: 'That file type Isn\'t allowed!'}, false)
		}
	}
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
	if (!req.file) {
		next();
		return;
	}
	const extention = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extention}`;
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(680, 480);
	await photo.write(`./public/uploads/${req.body.photo}`);
	next();
}

exports.getWorks = async (req, res) => {
	const works = await Work.find();
	res.render('works', {name: 'works', works});
}

exports.addWork = async (req, res) => {
	const work = await ( new Work(req.body).save());
	res.send({name: work.name, _id: work._id});
}

exports.deleteWork = async (req, res) => {
	const work = await Work.findByIdAndRemove(req.params.id);
	fs.unlink(path.join(__dirname, `../public/uploads/${work.photo}`), (err) => {
	  if (err) throw err;
	  console.log(`successfully deleted ${work.photo}`);
	});
	res.send('Удаление прошло успешно');
}