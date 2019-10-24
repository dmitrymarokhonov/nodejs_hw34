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
  // Не работает
  const {name, price} = await ctx.request.body;
  const {path} = await ctx.request.files.file;
  console.log(name);
  
  
  nconfDb.set(`products:${name}`, {
    src: image.path.slice(path.indexOf('/')),
    name: name,
    price: price
  });
  nconfDb.save();
  res.redirect('/');
}


