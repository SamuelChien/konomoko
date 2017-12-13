const express = require('express');
const router = express.Router();
const Config = require('../config'), serverConfig = new Config();
//Test: sk_test_rGmApxU2IwX1QI1KkkRZBtV5   Live: sk_live_cAEIaEXB48tk5Hz7DpAQus11 (also change client key in stripeBase.js)
const stripe = require("stripe")(serverConfig.stripeServerKey);
const emailHelper = require('../lib/email')
const Report = require('../models/report');
const Schedule = require('../models/schedule');
const Transaction = require('../models/transaction');
const Money = require('js-money');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/scheduleCharge', function(req, res, next) {
    const email = req.query.email;
    const searchPhrase = req.query.searchPhrase;
    const tokenId = req.query.token_id;
    const phoneNum = req.query.phone;

    let amount = 40000;

    // Charge the user's card:
    stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: "MangoInspect Inspection",
        metadata: {mls: searchPhrase, buyer:email, phone:phoneNum},
        source: tokenId,
    }, function(err, charge) {
        if(err)
        {
            return res(err);
        }
        else
        {
            const schedule = new Schedule({
                buyer_email: email,
                buyer_phone: phoneNum,
                schedule_searchTerm: searchPhrase
            });
            schedule.save();

            emailHelper.emailForSchedule(email, searchPhrase, phoneNum);
            return res.send('Thank you for choosing MangoInspect. We will schedule the inspection within 48 hours. Enjoy!');
        }
    });
});

router.get('/charge', function(req, res, next) {
    var email = req.query.email;
    var tokenId = req.query.token_id;
    var phoneNum = req.query.phone;
    var reportId = req.query.report_id;
    let amount = 15000;

    // Charge the user's card:
    stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: "MangoInspect Inspection",
        metadata: {report: reportId, buyer:email, phone:phoneNum},
        source: tokenId,
    }, function(err, charge) {
        if(err)
        {
            return res(err);
        }
        else
        {
            const transaction = new Transaction({
                buyer_email: email,
                buyer_phone: phoneNum,
                report_id: reportId
            });
            transaction.save();

            Report.getReportById(reportId, function (err, report){
                /*
                 * Update the revenue and sales of the report
                 * Uploader earns $50.00 for every new purchase.
                **/
                let chargedAmount = new Money(5000, Money.USD); // $50.00 USD
                let newRevenue = new Money(report.revenue, Money.USD).add(chargedAmount);
                report.revenue = newRevenue.amount;
                report.number_of_sales += 1;

                // Update the database
                report.markModified('revenue');
                report.markModified('number_of_sales');
                report.save(function (err, updatedReport) {
                    if (err) return res(err);
                    // Sending the report to buyer.
                    emailHelper.emailForPurchased(email, report.uploader_id, report.mls, report.storage_location);
                    return res.send('Thank you for choosing MangoInspect. Report has been sent to your email. Enjoy!');
                });
            });
        }
    });
});

module.exports = router;
