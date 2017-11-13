const express = require('express');
const router = express.Router();
const Report = require('../models/report');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Home' });
// });
// module.exports = router;

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/login');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { message: req.flash('message') });
  });

  /* GET Registration Page */
  // router.get('/signup', function(req, res){
  //   res.render('auth/login',{message: req.flash('message')});
  // });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash : true
  }));

  /* Return Dashboard if user is logged in */
  router.get('/dashboard', isAuthenticated, function(req, res){
    Report
    .find()
    .where('uploader_id').equals(req.user.username)
    .sort({ timestamp: -1 }).
    exec(function (err, reports) {
      if (err) console.log(err);
      res.render('dashboard/dashboard',
        { title: 'Dashboard',
          reports: reports,
          name: req.user.name,
          email: req.user.email
        });
    });
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash : true  
  }));

  /* Handle Login GET */
  router.get('/login', function(req, res, next) {
    res.render('auth/login', { title: 'Login' });
  });

  router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
  });

  return router;
}