const formidable = require('formidable');
const nconfDb = require('../models/nconfDb')();

module.exports.get = async (ctx, next) => {
  const products = Object.values(nconfDb.get('products') || {});
  console.log(products);
  
    console.log(`index controller isAuth: ${ctx.session.isAdmin}`);
    // isAuth: ctx.request.session.isAdmin, 
    await ctx.render('pages/index', { 
      title: 'Home', 
      msgsemail: 'some message',
      isAuth: false, 
      products: products 
    });
};

// module.exports.postMessage = (req, res, next) => {
//   let messageForm = new formidable.IncomingForm();

//   messageForm.parse(req, (err, fields) => {
//     if (err) return next();
//     console.log(fields);
//     nconfDb.set(
//       `messages:${new Date()
//         .toISOString()
//         .replace(/:/g, '')
//         .replace('T', '_')}`,
//       {
//         name: fields.name,
//         email: fields.email,
//         message: fields.message
//       }
//     );
//     nconfDb.save();
//     res.redirect('/?msgsemail=Сообщение отправлено.');
//   });
// };
