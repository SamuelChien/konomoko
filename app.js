const express = require('express');
const nodalytics = require('nodalytics');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const mongoose = require('mongoose');
const Config = require('./config'), config = new Config();
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbKey, { useMongoClient: true,});

//Configuring Passport
const flash = require('connect-flash');
const passport = require('passport');
const index = require('./routes/index')(passport);
const reports = require('./routes/reports');
const stripe = require('./routes/stripe');
const upload = require('./routes/upload');
const profile = require('./routes/profile');
const feedback = require('./routes/feedback');
const nexmo = require('./routes/nexmo');
const pdf = require('./routes/pdf');
const winston = require('winston');
const expressWinston = require('express-winston');
const fs = require( 'fs' );
const logsDirectory = 'logs';
if ( !fs.existsSync( logsDirectory ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logsDirectory );
}

// Log session and request/response body
expressWinston.requestWhitelist.push('session', 'body');
expressWinston.responseWhitelist.push('body');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//set up session
app.use(session({
    name: 'session',
    keys: ['key1', 'key2']
}))

// set a cookie for store the stripe client side id
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    res.cookie('stripeClientKey', config.stripeClientKey);
  }
  next(); // <-- important!
});



app.use(express.static(path.join(__dirname, 'public')));

// express-winston logger makes sense BEFORE the router.
app.use(expressWinston.logger({
  transports: [
    // Uncomment this to log things in the console.
    // new winston.transports.Console({
    //   json: true,
    //   colorize: process.stdout.isTTY, // color it if it's terminal
    // }),
    new winston.transports.File({
      filename:'logs/combined.log',
      json: false,
      colorize: process.stdout.isTTY, // color it if it's terminal
      prettyPrint: true,
      timestamp: true,
      maxsize: 4000000, // 4MB
      maxFiles: 2
    })
  ]
}));

//Google Analytics
app.use(nodalytics('UA-109748704-1'));


// Passport init
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./passport/init');
initPassport(passport);
//initialize flash
app.use(flash());
// Routes
app.use('/', index);
app.use('/reports', reports);
app.use('/stripe', stripe);
app.use('/upload', upload);
app.use('/profile', profile);
app.use('/feedback', feedback);
app.use('/pdf', pdf);
app.use('/nexmo', nexmo);

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
  transports: [
    // Uncomment this to log things in the console.
    // new winston.transports.Console({
    //   json: true,
    //   colorize: process.stdout.isTTY // color it if it's terminal
    // }),
    new winston.transports.File({
      filename: 'logs/error.log',
      json: false,
      colorize: process.stdout.isTTY, // color it if it's terminal
      prettyPrint: true,
      timestamp: true,
      maxsize: 4000000, // 4MB
      maxFiles: 2
    })
  ]
}));

// Optionally you can include your custom error handler after the logging.
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