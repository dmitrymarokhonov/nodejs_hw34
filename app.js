require('dotenv').config();
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const session = require('koa-session');
const Pug = require('koa-pug');
const multer = require('multer');
const config = require('./config')
const router = require('./routes')
const port = process.env.PORT || 3500;

const pug = new Pug({
  viewPath: './views',
  pretty: false,
  basedir: './views',
  noCache: true,
  app: app
})

const app = new Koa();


const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/assets/img/products')
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + '-' + file.originalname)
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
}

app.use(static(path.join(__dirname, 'public')));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('photo'))

app
.use(session(config.session, app))
.use(router.routes())
.use(router.allowMethods());


app.on('error', (err, ctx) => {
  ctx.render('error', {
    message: ctx.response.status,
    error: ctx.response.message
  });
});

const server = app.listen(port, () => {
  console.log('Example app listening on port ' + server.address().port);
});
