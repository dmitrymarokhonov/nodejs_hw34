const nconfDb = require('../models/nconfDb')();

module.exports.get = (req, res) => {
  req.session.isAdmin
    ? res.redirect('/')
    : res.render('pages/login', { title: 'Login' });
};

module.exports.post = (req, res) => {
  const users = nconfDb.get('users');
  for (let user in users) {
    if (
      users[user].email === req.body.email &&
      users[user].password === req.body.password
    ) {
      req.session.isAdmin = true;
    }
  }
  req.session.isAdmin
    ? res.redirect('/')
    : res.status(401).json({ message: 'Authorization failed!' });
};
