const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const app = express();

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('photo'))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'homework_3_express',
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

// const server = app.listen(port, () => console.log(`Example app listening on port ${port}`));
const server = app.listen(process.env.PORT || 3500, () => {
  console.log('Example app listening on port ' + server.address().port);
});
