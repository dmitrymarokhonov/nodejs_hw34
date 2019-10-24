const formidable = require('formidable');
const nconfDb = require('../models/nconfDb')();

module.exports.get = async (ctx, next) => {
  const products = Object.values(nconfDb.get('products') || {});
  // console.log(products);
  
    // console.log(`index controller isAuth: ${ctx.session.isAdmin}`);
    // isAuth: ctx.request.session.isAdmin, 
    ctx.render('pages/index', { 
      title: 'Home', 
      msgsemail: 'some message',
      isAuth: ctx.session.isAdmin || false, 
      products: products 
    });
};

module.exports.postMessage = async (ctx, next) => {
  // let messageForm = new formidable.IncomingForm();

console.log(ctx.request.body);

  // messageForm.parse(ctx, (err, fields) => {
  //   if (err) return next();
  //   console.log(fields);
  //   nconfDb.set(
  //     `messages:${new Date()
  //       .toISOString()
  //       .replace(/:/g, '')
  //       .replace('T', '_')}`,
  //     {
  //       name: fields.name,
  //       email: fields.email,
  //       message: fields.message
  //     }
  //   );
  //   nconfDb.save();
    ctx.redirect('/?msgsemail=Сообщение отправлено.');
};
