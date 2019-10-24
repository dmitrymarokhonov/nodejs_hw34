const nconfDb = require('../models/nconfDb')();

module.exports.get = async (ctx, next) => {
  (ctx.session.isAdmin)
    ? ctx.redirect('/')
    : ctx.render('pages/login', { title: 'Login' });
};

module.exports.post = async (ctx, next) => {
  const users = Object.values(nconfDb.get('users'));
  console.log(users);
  console.log(ctx.request.body);
  const { email, password } = ctx.request.body;
  let existUser = users.find(user => user.email === email);
  if (!existUser || existUser.password !== password) {
    console.log('rabotaet______________________________');
    ctx.render('pages/login', {title: 'Login'})
  }
  ctx.session.isAdmin = true;
  ctx.redirect('/admin');
};    