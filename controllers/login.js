const nconfDb = require('../models/nconfDb')();

module.exports.get = async (ctx, next) => {
  (await ctx.session.isAdmin)
    ? await ctx.redirect('/')
    : await ctx.render('pages/login', { title: 'Login' });
};

module.exports.post = async (ctx, next) => {
  const users = Object.values(nconfDb.get('users'));
  console.log(ctx);
  const { email, password } = ctx.request.body;
  let existUser = users.find(user => user.email === email);
  if (!existUser || existUser.password !== password) {
    console.log('rabotaet______________________________');
    await ctx.status(401).json({ message: 'Authorization failed!' });
  }
  ctx.session.isAdmin = true;
  await ctx.redirect('/admin');
};
