var express = require('express');
var router = express.Router();

var Report = require('../models/report');

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

module.exports = router;
