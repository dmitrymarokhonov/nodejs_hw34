const formidable = require('formidable');
const nconfDb = require('../models/nconfDb')();

module.exports.get = (req, res) => {
  res.render('pages/index', { title: 'Home', msgsemail: req.query.msgsemail });
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
