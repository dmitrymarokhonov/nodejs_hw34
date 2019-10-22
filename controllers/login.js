const nconfDb = require('../models/nconfDb')();

module.exports.get = (req, res) => {
  req.session.isAdmin
    ? res.redirect('/')
    : res.render('pages/login', { title: 'Login' });
};

module.exports.post = (req, res) => {
  const users = Object.values(nconfDb.get('users'));
  let existUser = users.find(user => user.email === req.body.email)
  if (!existUser || existUser.password !== req.body.password) {
    res.status(401).json({ message: 'Authorization failed!' })
  }
  req.session.isAdmin = true;
  res.redirect('/admin')
};
