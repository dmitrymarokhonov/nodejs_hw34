const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('views', path.join(__dirname, 'views', 'template'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
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
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

// const server = app.listen(port, () => console.log(`Example app listening on port ${port}`));
const server = app.listen(process.env.PORT || 3500, () => {
  console.log('Example app listening on port ' + server.address().port);
});
