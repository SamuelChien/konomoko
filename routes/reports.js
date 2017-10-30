var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/fuzzySearch', function(req, res, next) {
    var db = req.db;

    db.collection("reports").find({$or:[{"mls":{$regex:req.query.searchTerm}}, {"address":{$regex:req.query.searchTerm}}]}).toArray(function(err, data){
        if (err) {
            console.log(err);
            return res(err);
        } else {
            return res.json(data);
        }
    });
});

router.get('/getreportsbymls', function(req, res, next) {
    var mlsNumber = parseInt(req.query.mls);

    var db = req.db;
    db.collection("reports").find({"mls":mlsNumber}).toArray(function(err, data){
        if (err) {
            console.log(err);
            return res(err);
        } else {
            console.log(data);
            return res.json(data);
        }
    });
});

module.exports = router;
