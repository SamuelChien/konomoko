var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/charge', function(req, res, next) {
    let amount = 500;
    let stripe = req.stripe;
    stripe.customers.create({
        email: req.body.email,
        card: req.body.id
    }).then(customer =>
    stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
    })).then(charge => res.send(charge)).catch(err => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
    });
});

module.exports = router;
