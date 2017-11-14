const express = require('express');
const router = express.Router();
const Report = require('../models/report');

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/login');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    res.render('home/index', { message: req.flash('message') });
  });

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
          email: req.user.userame
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