var express = require('express');
var router = express.Router();
//Test: sk_test_rGmApxU2IwX1QI1KkkRZBtV5   Live: sk_live_cAEIaEXB48tk5Hz7DpAQus11
const stripe = require("stripe")("sk_test_rGmApxU2IwX1QI1KkkRZBtV5");
const emailHelper = require('../lib/email')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/scheduleCharge', function(req, res, next) {
    var email = req.query.email;
    var searchPhrase = req.query.searchPhrase;
    var tokenId = req.query.token_id;
    var phoneNum = req.query.phone;

    let amount = 25000;

    // Charge the user's card:
    stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: "Konomoko Inspection",
        metadata: {mls: searchPhrase, buyer:email, phone:phoneNum},
        source: tokenId,
    }, function(err, charge) {
        if(err)
        {
            return res(err);
        }
        else
        {
            emailHelper.emailAdminForSchedule(email, searchPhrase, phoneNum);
            return res.send('Thank you for choosing Konomoko. We will schedule the inspection within 48 hours. Enjoy!');
        }
    });
});

router.get('/charge', function(req, res, next) {
    var email = req.query.email;
    var reportId = req.query.report_id;
    var tokenId = req.query.token_id;
    var phoneNum = req.query.phone;

    let amount = 9900;

    // Charge the user's card:
    stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: "Konomoko Inspection",
        metadata: {report: reportId, buyer:email, phone:phoneNum},
        source: tokenId,
    }, function(err, charge) {
        if(err)
        {
            return res(err);
        }
        else
        {
            //emailHelper.emailCustomerReports(email, reportId);
            return res.send('Thank you for choosing Konomoko. Report has been sent to your email. Enjoy! ');
        }
    });
});

module.exports = router;
