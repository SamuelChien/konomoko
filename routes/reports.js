var express = require('express');
var router = express.Router();

var Report = require('../models/report');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/fuzzySearch', function(req, res, next) {
    Report.getFuzzySearch(req.query.searchTerm, function (err, reports){
        if(err) return res(err);
        else return res.json(reports);
    });

});

module.exports = router;
