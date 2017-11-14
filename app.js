const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Initialize connection once (localhost "mongodb://localhost:27017/konomoko")
mongoose.connect('mongodb://konomoko:BRuFfI4XaJ6Y5vIwaMbLiMe2CSAoZCHTa0ktQWspQ9uoxkFInOcHsL3ak9sIeirMHW6hcWJ80OcVBMgCaN0yGQ==@konomoko.documents.azure.com:10255/konomoko?ssl=true', { useMongoClient: true,});

// Configuring Passport
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const index = require('./routes/index')(passport);
const reports = require('./routes/reports');
const stripe = require('./routes/stripe');
const upload = require('./routes/upload');
const profile = require('./routes/profile');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
    app.use(session({
            secret: 'secret',
        saveUninitialized: true,
        resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./passport/init');
initPassport(passport);

//initialize flash
app.use(flash());


app.use('/', index);
app.use('/reports', reports);
app.use('/stripe', stripe);
app.use('/upload', upload);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
