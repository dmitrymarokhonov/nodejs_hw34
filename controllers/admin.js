const nconfDb = require('../models/nconfDb')();

module.exports.get = async (ctx, next) => {
  await ctx.render('pages/admin', { title: 'Admin', msg: ctx.query.msg });
};

module.exports.postSkills = async (ctx, next) => {
  const { age, concerts, cities, years } = ctx.request.body;
  nconfDb.set(
    'skills',
    {
      age: age,
      concerts: concerts,
      cities: cities,
      years: years
    }
  );
  nconfDb.save();
  ctx.redirect('/admin?msg=Счетчик успешно добавлен');
};

module.exports.postMulterUpload = async (ctx, next) => {
  const { photo, name, price } = ctx.request.body;

  nconfDb.set(`products:${name}`, {
    src: '/assets/img/products/' + photo,
    name: name,
    price: price
  });
  nconfDb.save();

  ctx.redirect('/admin/?msg=Upload отработал');
}


