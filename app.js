const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const session = require('koa-session');
const Pug = require('koa-pug');
const multer = require('koa-multer');
const pug = new Pug({
  viewPath: './views',
  pretty: false,
  basedir: './views',
  noCache: true,
  app: app, // equals to pug.use(app) and app.use(pug.middleware)
});
const errorHandler = require('./libs/error');
const config = require('./config');
const router = require('./routes');
const port = process.env.PORT || 3500;

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/assets/img/products');
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  switch (file.mimetype) {
    case 'image/png':
      callback(null, true);
      break;
    case 'image/jpeg':
      callback(null, true);
      break;
    case 'image/jpg':
      callback(null, true);
      break;
    default:
      callback(null, false);
      break;
  }
};

app.use(static('./public'));

app.use(errorHandler);

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('photo')
);

app.on('error', (err, ctx) => {
  ctx.request;
  ctx.response.body = {};
  ctx.redirect('/', {
    status: ctx.response.status,
    error: ctx.response.message
  });
});

app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods());


const server = app.listen(port, () => {
  console.log('Example app listening on port ' + server.address().port);
});
