const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const Transaction = require('../models/transaction');
const Money = require('js-money');

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
      let totalSales = 0; reports.reduce((r1, r2) => r1.number_of_sales + r2.number_of_sales, 0);
      let totalRevenue = new Money(0, Money.USD);
      reports.forEach (report => {
        totalSales += report.number_of_sales;
        totalRevenue = totalRevenue.add(new Money(report.revenue, Money.USD));
      });

        Transaction
            .find()
            .where('buyer_email').equals(req.user.username)
            .exec(function (err, transactions){
                var report_id_set = new Set();
                transactions.forEach(function(transaction){
                    report_id_set.add(transaction.report_id);
                });
                Report
                    .find({'report_id':{ $in: Array.from(report_id_set) }})
                    .exec(function(err, boughtReports){
                        res.render('dashboard/dashboard',
                            { title: 'Dashboard',
                                reports: reports,
                                boughtReports: boughtReports,
                                name: req.user.name,
                                email: req.user.userame,
                                totalSales: totalSales,
                                totalRevenue: (totalRevenue.amount/100).toFixed(2)
                            });
                    });
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