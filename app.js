//Test
const keyPublishable = "pk_test_Qy30tfLZhKSn4pEFoIo3zeIj";
const keySecret = "sk_test_rGmApxU2IwX1QI1KkkRZBtV5";

//Live
//const keyPublishable = "pk_live_lpH0j5q53cvx2A2xTIyEfQIO";
//const keySecret = "sk_live_cAEIaEXB48tk5Hz7DpAQus11";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
const stripeInstance = require("stripe")(keySecret);



//Initialize connection once (localhost "mongodb://localhost:27017/konomoko")
mongoose.connect('mongodb://konomoko:BRuFfI4XaJ6Y5vIwaMbLiMe2CSAoZCHTa0ktQWspQ9uoxkFInOcHsL3ak9sIeirMHW6hcWJ80OcVBMgCaN0yGQ==@konomoko.documents.azure.com:10255/konomoko?ssl=true', { useMongoClient: true,});
var db = mongoose.connection;

var index = require('./routes/index');
var users = require('./routes/users');
var reports = require('./routes/reports');
var dashboard = require('./routes/dashboard');
var login = require('./routes/login');
var stripe = require('./routes/stripe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.stripe = stripe;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/reports', reports);
app.use('/dashboard', dashboard);
app.use('/login', login);
app.use('/stripe', stripe);

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
