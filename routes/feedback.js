var express = require('express');
var router = express.Router();

var Feedback = require('../models/feedback');

router.get('/', function(req, res, next) {
    res.render('feedback/feedback', { title: 'Feedback' });
});

router.post('/', function(req, res, next) {
    const feedback = new Feedback({
      email: req.body.feedbackEmail,
      text: req.body.feedbackText
    });
    feedback.save();
    res.redirect('/');
});

module.exports = router;
