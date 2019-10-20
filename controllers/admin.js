const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const nconfDb = require('../models/nconfDb')();

module.exports.get = (req, res) => {
  res.render('pages/admin', { title: 'Admin', msg: req.query.msg });
};

module.exports.postSkills = (req, res, next) => {
  let skillsForm = new formidable.IncomingForm();
  skillsForm.parse(req, (err, fields) => {
    if (err) {
      return next();
    }
    console.log(fields);
    const valid = validateSkills(fields);
    if (valid.err) {
      return res.redirect(`msg=${valid.status}`);
    }

    nconfDb.set(
      `skills:${new Date()
        .toISOString()
        .replace(/:/g, '')
        .replace('T', '_')}`,
      {
        age: fields.age,
        concerts: fields.concerts,
        cities: fields.cities,
        years: fields.years
      }
    );
    nconfDb.save();
    res.redirect('/admin?msg=Счетчик успешно добавлен');
  });
};

module.exports.postUpload = (req, res, next) => {
  let uploadForm = new formidable.IncomingForm();
  let upload = path.join(process.cwd(), 'public', 'assets', 'img', 'products');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  uploadForm.uploadDir = upload;

  uploadForm.parse(req, (err, fields, files) => {
    if (err) {
      return next();
    }

    const valid = validateUpload(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      return res.redirect(`admin/?msg=${valid.status}`);
    }

    const fileName = path.join(upload, files.photo.name);
    const pathArr = fileName.split('/');
    const filePath = pathArr.splice(pathArr.indexOf('assets'), pathArr.length);
    const filePathWin = filePath
      .map(pathItem => '\\' + pathItem)
      .reduce((acc, cur) => acc + cur);
    const filePathLinux = filePath
      .map(pathItem => '/' + pathItem)
      .reduce((acc, cur) => acc + cur);

    fs.rename(files.photo.path, fileName, err => {
      if (err) {
        console.log(err.message);
        return;
      }

      nconfDb.set(`uploads:${fields.name}`, {
        dirWindows: filePathWin,
        dirLinux: filePathLinux,
        name: fields.name,
        price: fields.price
      });
      nconfDb.save();
      res.redirect('/admin?msg=Товар успешно добавлен');
    });
  });
};

const validateUpload = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true };
  }
  if (!fields.name) {
    return { status: 'Не указано описание картинки!', err: true };
  }
  return { status: 'Ok', err: false };
};

const validateSkills = fields => {
  if (!fields.age || isNaN(fields.age)) {
    return { status: 'Возраст указан неправильно!', err: true };
  }
  if (!fields.concerts || isNaN(fields.concerts)) {
    return { status: 'Ошибка в кол-ве концертов!', err: true };
  }
  if (!fields.cities || isNaN(fields.cities)) {
    return { status: 'Ошибка в кол-ве городов!', err: true };
  }
  if (!fields.years || isNaN(fields.years)) {
    return { status: 'Кол-во лет на сцене указано неправильно!', err: true };
  }
  return { status: 'Ok', err: false };
};
