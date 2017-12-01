const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const emailHelper = require('../lib/email');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/fuzzySearch', function(req, res, next) {
    Report.getFuzzySearch(req.query.searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), function (err, reports){
        return res.json(reports);
    });

});

router.get('/reportUrlById', function(req, res, next) {
    Report.getFuzzySearch(req.query.searchTerm, function (err, reports){
        //TODO: get the real rating
        return res.json(reports);
    });

});

router.get('/publish/:id', function(req, res, next) {
    const reportId = req.params.id;
    const query = {'report_id': reportId};
    Report.findOneAndUpdate(query, {'status': 'Active'}, function(err, doc){
        if (err) return res.send(500, { error: err });
        emailHelper.emailForReportApproved(reportId);
        return res.send("Success");
    });

});

module.exports = router;
