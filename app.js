var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const models = require(path.join(__dirname, 'models'));

passport.use(new LocalStrategy(
  function(email, password, done) {
    models.User.findOne({ where:{email: email} }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
  ));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'keybord cat',
  resave: false, 
  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var routes = require('./routes/webRoutes')
routes(app);
require(path.join(__dirname, 'Config/passport.js')(passport, models.User);
 



//catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res,next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
