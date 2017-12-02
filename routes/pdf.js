var express = require('express');
var router = express.Router();
const pdfHelper = require('../lib/pdf');
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
    pdfHelper.getPreviewUrl(ObjectId("5a108f04d6af7ec0057faa54"), "https://mangoinspectdevo.blob.core.windows.net/reports/1511034622141-FullReport");
    res.send("default value");
});

module.exports = router;
