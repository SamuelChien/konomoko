const express = require('express');
const router = express.Router();
const Report = require('../models/report');

/* GET dashboard page. */
router.get('/', function(req, res, next) {
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

module.exports = router;
