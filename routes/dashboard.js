var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    
    res.render('dashboard/dashboard', { title: 'Dashboard' });
});

// function ensureAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     } else {
//         //req.flash('error_msg','You are not logged in');
//         res.redirect('/users/login');
//     }
// }

module.exports = router;
