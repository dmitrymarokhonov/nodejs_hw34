const formidable = require('formidable');
const nconfDb = require('../models/nconfDb')();

module.exports.get = (req, res) => {

  const products = Object.values(nconfDb.get('products') || {});

  console.log(`index controller isAuth: ${req.session.isAdmin}`);
  res.render('pages/index', { 
    title: 'Home', 
    msgsemail: req.query.msgsemail,
    isAuth: req.session.isAdmin, 
    products: products 
  });
};

module.exports.postMessage = (req, res, next) => {
  let messageForm = new formidable.IncomingForm();

  messageForm.parse(req, (err, fields) => {
    if (err) return next();
    console.log(fields);
    nconfDb.set(
      `messages:${new Date()
        .toISOString()
        .replace(/:/g, '')
        .replace('T', '_')}`,
      {
        name: fields.name,
        email: fields.email,
        message: fields.message
      }
    );
    nconfDb.save();
    res.redirect('/?msgsemail=Сообщение отправлено.');
  });
};
