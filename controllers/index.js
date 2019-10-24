const nconfDb = require('../models/nconfDb')();

module.exports.get = async (ctx, next) => {
  const products = Object.values(nconfDb.get('products') || {});
  // console.log(products);

  // console.log(`index controller isAuth: ${ctx.session.isAdmin}`);
  // isAuth: ctx.request.session.isAdmin, 
  ctx.render('pages/index', {
    title: 'Home',
    msgsemail: ctx.query.msgsemail || '',
    isAuth: ctx.session.isAdmin || false,
    products: products
  });
};

module.exports.postMessage = async (ctx, next) => {
  const { name, email, message } = ctx.request.body;
  console.log(ctx.request.body);
  nconfDb.set(
    `messages:${new Date()
      .toISOString()
      .replace(/:/g, '')
      .replace('T', '_')}`,
    {
      name: name,
      email: email,
      message: message
    }
  );
  nconfDb.save();

  ctx.redirect('/?msgsemail=Сообщение отправлено.');
};
