const express = require('express');
const router = express.Router();
const Report = require('../models/report');

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    Report
    .find()
    .where('uploader_id').equals('johnny')
    .sort({ timestamp: -1 }).
    exec(function (err, reports) {
      if (err) console.log(err);
      console.log(reports);
      res.render('dashboard/dashboard',
        { title: 'Dashboard',
          reports: reports
        });
    });
});

module.exports = router;
