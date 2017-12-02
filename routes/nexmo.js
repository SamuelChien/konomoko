var express = require('express');
var router = express.Router();
const nexmoHelper = require('../lib/nexmo');

/* GET home page. */
router.get('/', function(req, res, next) {
	nexmoHelper.submitPhoneAuthentication('+12069722280', (err, result) => {
		if(err) {
	      //res.sendStatus(500);
	      res.send('Server Error');
	    } else {
	      console.log(result);
	      let requestId = result.request_id;
	      if(result.status == '0') {
	        res.send(requestId);
	      } else {
	        res.send(result.error_text);
	      }
	    }
	});
});

router.get('/verify', function(req, res, next) {
	nexmoHelper.verifyPhoneAuthentication('8707d413f39c4c73b94d1ec0683efa32', '0171', (err, result) => {
		if(err) {
	      //res.status(500).send(err);
	      res.send('Server Error');
	    } else {
	      // Error status code: https://docs.nexmo.com/verify/api-reference/api-reference#check
	      if(result && result.status == '0') {
	        //res.status(200).send('Account verified!');
	        res.send('Account verified!');
	      } else {
	        //res.status(401).send(result.error_text);
	        res.send(result.error_text);
	      }
	    }
	});
});

module.exports = router;
