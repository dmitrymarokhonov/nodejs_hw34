const nconfDb = require('../models/nconfDb')();

module.exports.get = async (ctx, next) => {
  await ctx.render('pages/admin', { title: 'Admin', msg: ctx.query.msg });
};

// module.exports.postSkills = (req, res, next) => {

//   console.log(req.body);
//   const fields = req.body;
//   const valid = validateSkills(fields);
//   if (valid.err) {
//     return res.redirect(`/admin?msg=${valid.status}`);
//   }

//   nconfDb.set(
//     'skills',
//     {
//       age: fields.age,
//       concerts: fields.concerts,
//       cities: fields.cities,
//       years: fields.years
//     }
//   );
//   nconfDb.save();
//   res.redirect('/admin?msg=Счетчик успешно добавлен');
// };

// module.exports.postMulterUpload = (req, res, next) => {
//   const image = req.file;
//   const fields = req.body;
//   !image && res.status(422).render('/admin?msg=Ошибка при добавлении фото');

//   const valid = validateUpload(fields, image);
//   valid.err && res.status(422).render(`/admin?msg=${valid.status}`);

//   nconfDb.set(`products:${fields.name}`, {
//     src: image.path.slice(image.path.indexOf('/')),
//     name: req.body.name,
//     price: req.body.price
//   });
//   nconfDb.save();
//   res.redirect('/');
// }


const validateUpload = (fields, image) => {
  if (image.originalname === '' || image.size === 0) {
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
