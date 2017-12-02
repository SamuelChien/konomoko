const Nexmo = require('nexmo');
const Config = require('../config'), serverConfig = new Config();

const nexmo = new Nexmo({
  apiKey: serverConfig.nexmoAPIKey,
  apiSecret: serverConfig.nexmoAPISecret
});

function submitPhoneAuthentication(phoneNumber, cb){

    nexmo.verify.request({number: phoneNumber, brand: 'Mango Inspect'}, cb);
}

exports.submitPhoneAuthentication = submitPhoneAuthentication;

function verifyPhoneAuthentication(requestId, pin, cb){

    nexmo.verify.check({request_id: requestId, code: pin}, cb);
}

exports.verifyPhoneAuthentication = verifyPhoneAuthentication;


function cancelPhoneAuthentication(requestId, cb){

    nexmo.verify.control({request_id:requestId,cmd:'cancel'}, cb);
}

exports.cancelPhoneAuthentication = cancelPhoneAuthentication;