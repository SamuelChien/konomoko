const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');

// Configuring Passport
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');


//Initialize connection once (localhost "mongodb://localhost:27017/konomoko")
mongoose.connect('mongodb://konomoko:BRuFfI4XaJ6Y5vIwaMbLiMe2CSAoZCHTa0ktQWspQ9uoxkFInOcHsL3ak9sIeirMHW6hcWJ80OcVBMgCaN0yGQ==@konomoko.documents.azure.com:10255/konomoko?ssl=true', { useMongoClient: true,});
const db = mongoose.connection;

const index = require('./routes/index')(passport);
const users = require('./routes/users');
const reports = require('./routes/reports');
const dashboard = require('./routes/dashboard');
const login = require('./routes/login');
const stripe = require('./routes/stripe');
const upload = require('./routes/upload');
const profile = require('./routes/profile');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Configuring Passport
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
// Passport init
app.use(passport.initialize());
app.use(passport.session());
// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
// Connect Flash
app.use(flash());

// =============  Begin: Initialize Passport ================
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// =============  End: Initialize Passport ================

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.use('/', index);
app.use('/users', users);
app.use('/reports', reports);
app.use('/dashboard', dashboard);
app.use('/login', login);
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = app;
